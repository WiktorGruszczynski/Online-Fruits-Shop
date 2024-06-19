package com.example.server.app.product;

import com.example.server.app.admin.AdminService;
import com.example.server.app.product.models.AvailabilityEditBody;
import com.example.server.app.product.models.Product;
import com.example.server.app.product.models.ProductBody;
import com.example.server.tools.responses.SuccessResponse;
import com.example.server.tools.security.AdminToken;
import com.example.server.tools.security.Network;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.Inet4Address;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProductService {


    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AdminService adminService;

    private String randomFilename(){
        byte size = 16;

        Random random = new Random();
        StringBuilder buffer = new StringBuilder(size);
        for (int i=0; i<size; i++) {
            int x = random.nextInt(98, 120);
            buffer.append((char)x);
        }

        return buffer.toString();
    }


    private String saveFile(MultipartFile file) throws IOException {
        String filename = randomFilename();

        String absolutPath = new File(".").getCanonicalPath();
        String finalPath = absolutPath + "/src/main/resources/uploads/" + filename;

        File targetFile = new File(finalPath);

        try (OutputStream outStream = new FileOutputStream(targetFile)) {
            outStream.write(file.getBytes());
        }

        return filename;
    }

    private Boolean deleteFile(String filename) throws IOException {
        String absolutPath = new File(".").getCanonicalPath();
        String finalPath = absolutPath + "/src/main/resources/uploads/" + filename;
        return new File(finalPath).delete();
    }


    public SuccessResponse<Product> addProduct(String adminToken, String productJson, MultipartFile file) throws IOException {
        if (!adminService.isTokenValid(adminToken)) return new SuccessResponse<>(false, null, "Invalid token");

        ProductBody productBody = new ObjectMapper().readValue(productJson, ProductBody.class);

        String filename = saveFile(file);
        String thumbnailUrl = "http://localhost:8080/api/product/uploads/" + filename;
        
        Product product = new Product(productBody.getName(), thumbnailUrl, productBody.getPrice());

        return new SuccessResponse<>(true, productRepository.save(product));
    }

    public Resource getProductImage(String filename) throws IOException{
        return new ByteArrayResource(Files.readAllBytes(Paths.get(
                "src/main/resources/uploads/"+filename
        )));
    }

    public Product getProductById(Long id){
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.orElse(null);
    }


    public List<Product> getProductsByIds(List<Long> idList){
        List<Product> products = new ArrayList<Product>();

        for (Long id: idList){
            products.add(getProductById(id));
        }

        return products;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public List<Product> getAllAvailableProducts(){
        return productRepository.findAllAvailable();
    }

    public Boolean editProduct(String token, Long id, MultipartFile file, String name, Float price) throws IOException {
        if (!adminService.isTokenValid(token)) return false;
        if (file==null && name==null && price==null) return true;

        Product product = productRepository.findById(id).orElse(null);

        if (product==null) return false;

        if (file!=null){
            String[] oldUrlParts = product.getThumbnail().split("/");
            String oldFilename = oldUrlParts[oldUrlParts.length-1];

            if (deleteFile(oldFilename)){
                String filename = saveFile(file);
                product.setThumbnail("http://localhost:8080/api/product/uploads/"+filename);
            }
        }

        if (name!=null) product.setName(name);
        if (price!=null) product.setPrice(price);


        productRepository.save(product);

        return true;
    }

    public Boolean setAvailability(String token, AvailabilityEditBody requestBody){
        if (!adminService.isTokenValid(token)) return false;

        Product product = productRepository.findById(requestBody.getProductId()).orElse(null);

        if (product==null) return false;

        product.setAvailability(requestBody.getAvailability());

        productRepository.save(product);

        return true;
    }
}

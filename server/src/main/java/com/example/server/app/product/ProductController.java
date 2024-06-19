package com.example.server.app.product;


import com.example.server.app.product.models.AvailabilityEditBody;
import com.example.server.app.product.models.Product;
import com.example.server.tools.responses.SuccessResponse;
import jakarta.websocket.server.PathParam;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;


@RestController
@RequestMapping(path = "/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping(path = "/uploads/{thumbnail}", produces = {MediaType.IMAGE_PNG_VALUE})
    public Resource getProductImage(@PathVariable("thumbnail") String filename) throws Exception {
        return productService.getProductImage(filename);
    }


    @PostMapping(path = "/getProductById")
    public Product getProductById(@RequestBody Long id){
        return productService.getProductById(id);
    }


    @PostMapping(path = "/getProductsByIds")
    public List<Product> getProductListByIds(@RequestBody List<Long> idList){
        return productService.getProductsByIds(idList);
    }

    @GetMapping(path = "/getAll")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping(path = "/getAllAvailable")
    public List<Product> getAllAvailable(){
        return productService.getAllAvailableProducts();
    }


    @PostMapping(path = "/add")
    public SuccessResponse<Product> addProduct(@PathParam("token") String adminToken, @RequestParam("product") String productJson, @RequestParam("file") MultipartFile file) throws Exception {
        return productService.addProduct(adminToken, productJson, file);
    }

    @PostMapping(path = "/edit")
    public Boolean editProduct(@PathParam("token") String token,
                               @RequestParam(value = "id") Long id,
                               @RequestParam(value = "thumbnail", required = false) MultipartFile file,
                               @RequestParam(value = "name", required = false) String name,
                               @RequestParam(value = "price", required = false) Float price) throws Exception{
        return  productService.editProduct(token, id, file, name, price);
    }

    @PostMapping(path = "/setAvailability")
    public Boolean setProductAvailability(@PathParam("token") String token, @RequestBody AvailabilityEditBody requestBody){
        return productService.setAvailability(token, requestBody);
    }
}

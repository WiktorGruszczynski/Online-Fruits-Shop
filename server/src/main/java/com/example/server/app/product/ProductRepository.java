package com.example.server.app.product;

import com.example.server.app.product.models.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM products WHERE availability=true ORDER BY id ASC", nativeQuery = true)
    List<Product> findAllAvailable();

}

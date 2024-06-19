package com.example.server.app.product.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String thumbnail;
    private Float price;
    private Boolean availability = true;

    public Product(String name, String thumbnail, Float price){
        this.name = name;
        this.thumbnail = thumbnail;
        this.price = price;
    }

}

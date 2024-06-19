package com.example.server.app.order.models;

import com.example.server.app.product.models.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartItem {
    private Product product;
    private Long quantity;
}

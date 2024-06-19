package com.example.server.app.order.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue
    private Long orderItemId;
    private Long orderId;
    private Long productId;
    private Long quantity;

    public OrderItem(Long orderId, Long productId, Long quantity){
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

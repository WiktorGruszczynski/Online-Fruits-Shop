package com.example.server.app.order;

import com.example.server.app.order.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM orders WHERE owner_id=?1", nativeQuery = true)
    List<Order> findAllWithSameOwner(Long ownerId);
}

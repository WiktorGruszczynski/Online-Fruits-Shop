package com.example.server.app.order;

import com.example.server.app.order.models.*;
import com.example.server.app.product.ProductRepository;
import com.example.server.app.product.models.Product;
import com.example.server.app.user.UserRepository;
import com.example.server.app.user.models.User;
import com.example.server.tools.responses.SuccessResponse;
import com.example.server.tools.security.AuthToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(UserRepository userRepository, OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }


    private AuthToken readTokenFromString(String tokenString){
        AuthToken authToken = new AuthToken();
        authToken.generateFromTokenString(tokenString);
        return authToken;
    }


    private Order createNewOrderObject(Long userId, Long timestamp){
        return new Order(
                userId,
                new Date(timestamp)
        );
    }


    private void createOrderItemObjects(Long orderId, CartItem cartItem) {
        orderItemRepository.save(new OrderItem(
                orderId,
                cartItem.getProduct().getId(),
                cartItem.getQuantity()
        ));
    }


    private List<CartItem> createCartItemsList(List<OrderItem> orderItems){
        List<CartItem> cartItems = new ArrayList<>();

        orderItems.forEach(orderItem -> {
            Product product = productRepository.findById(
                    orderItem.getProductId()
            ).orElse(null);


            cartItems.add(new CartItem(
                    product,
                    orderItem.getQuantity()
            ));
        });

        return cartItems;
    }


    private OrderResponseBody getOrderResponseObject(Order order){
        List<OrderItem> orderItems = orderItemRepository.findAllWithSameOrderId(order.getId());
        List<CartItem> cartItems = createCartItemsList(orderItems);

        return new OrderResponseBody(
                order.getId(),
                order.getDate().getTime(),
                cartItems
        );
    }


    public SuccessResponse<String> addNewOrder(OrderRequestBody orderRequestBody, String token){
        AuthToken authToken = readTokenFromString(token);

        if (authToken.isValid()){
            User user = userRepository.findByEmailAddress(authToken.getEmail());
            if (user == null) return new SuccessResponse<>(false, "user not found");

            Order order = createNewOrderObject(user.getId(), orderRequestBody.getTimestamp());
            orderRepository.save(order);

            CartItem[] cartItems = orderRequestBody.getCartItems();

            for (CartItem cartItem : cartItems) {
                createOrderItemObjects(order.getId(), cartItem);
            }

            return new SuccessResponse<>(true);
        }
        else {
            return new SuccessResponse<>(false, "Invalid token");
        }
    }


    public SuccessResponse<OrderResponseBody> getOrderById(Long orderId, String token){
        AuthToken authToken = readTokenFromString(token);

        if (authToken.isValid()){
            Order order = orderRepository.findById(orderId).orElse(null);

            if (order == null) return new SuccessResponse<>(false, null, "Order not found");

            return new SuccessResponse<>(true, getOrderResponseObject(order));
        }
        else {
            return new SuccessResponse<>(false, null,"Invalid Token");
        }
    }


    public SuccessResponse<List<OrderResponseBody>> getUserOrders(String token){
        AuthToken authToken = readTokenFromString(token);

        if (authToken.isValid()){
            User user = userRepository.findByEmailAddress(authToken.getEmail());

            List<Order> orders = orderRepository.findAllWithSameOwner(user.getId());
            List<OrderResponseBody> ordersResponseObject = new ArrayList<>();

            orders.forEach(order -> {
                if (order!=null){
                    ordersResponseObject.add(
                            getOrderResponseObject(order)
                    );
                }
            });

            return new SuccessResponse<>(true, ordersResponseObject);
        }
        else{
            return new SuccessResponse<>(false, null, "Invalid token");
        }
    }
}

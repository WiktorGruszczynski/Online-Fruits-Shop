package com.example.server.app.order;

import com.example.server.app.order.models.OrderRequestBody;
import com.example.server.app.order.models.OrderResponseBody;
import com.example.server.tools.responses.SuccessResponse;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/orders")
public class OrderController {

    @Autowired
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(path = "/add")
    public SuccessResponse<String> addNewOrder(@RequestBody OrderRequestBody orderRequestBody, @PathParam("token") String token){
        return orderService.addNewOrder(orderRequestBody, token);
    }

    @GetMapping(path = "/getById/{id}")
    public SuccessResponse<OrderResponseBody> getOrderById(@PathVariable("id") Long orderId, @PathParam("token") String token){
        return orderService.getOrderById(orderId, token);
    }

    @GetMapping(path = "/getUserOrders")
    public SuccessResponse<List<OrderResponseBody>> getUserOrders(@PathParam("token") String token){
        return orderService.getUserOrders(token);
    }

}

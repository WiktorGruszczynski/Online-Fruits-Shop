package com.example.server.app.admin;

import com.example.server.tools.security.AdminToken;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {

    @Autowired
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping(path = "/validateToken")
    public Boolean isTokenValid(@PathParam("token") String token) throws IllegalArgumentException{
        return adminService.isTokenValid(token);
    }

}

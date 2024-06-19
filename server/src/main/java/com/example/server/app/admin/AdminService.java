package com.example.server.app.admin;

import com.example.server.tools.security.AdminToken;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    public Boolean isTokenValid(String tokenString) throws IllegalArgumentException{
        return new AdminToken(tokenString).isValid();
    }
}

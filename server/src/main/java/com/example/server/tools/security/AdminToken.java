package com.example.server.tools.security;

import java.util.Objects;

public class AdminToken {
    private String value;

    public AdminToken(String value){
        this.value = value;
    }

    public Boolean isValid(){
        return Objects.equals(this.value, "g11tyItwi8ZG1tuCyFPvQYL6u9So3lnCE/K1qzrn2b4=");
    }
}

package com.example.server.tools.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class AuthToken {
    @JsonIgnore
    private String email;
    private String tokenString;
    private Long expires;

    private void setExpirationTimestamp(){
        this.expires = (new Date().getTime()) + 3600*24*1000;
    }

    public void generateFromEmail(String email) throws Exception{
        if (this.expires==null){
            setExpirationTimestamp();
        }

        this.email = email;
        this.tokenString = new CryptographyService().encrypt(email + "__" + this.expires);
    }

    public void generateFromTokenString(String tokenString){
        try {
            this.tokenString = tokenString;
            String[] elements = new CryptographyService().decrypt(tokenString).split("__");
            this.email = elements[0];
            this.expires = Long.valueOf(elements[1]);
        }
        catch (Exception ignored){
            this.tokenString = null;
            this.email = null;
        }
    }

    @JsonIgnore
    public boolean isValid(){
        return (this.tokenString!=null && this.email!=null);
    }

    @JsonIgnore
    public boolean isExpired(){
        return this.expires < (new Date().getTime());
    }
}

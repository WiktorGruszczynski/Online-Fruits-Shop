package com.example.server.tools.security;

import java.security.MessageDigest;
import java.util.Base64;

public class Hashlib {
    private final static String ALGORITHM = "SHA-256";

    public static String hash(String data) throws Exception{
        MessageDigest messageDigest = MessageDigest.getInstance(ALGORITHM);
        messageDigest.update(data.getBytes());
        return Base64.getEncoder().encodeToString(messageDigest.digest());
    }
}

package com.example.server.tools.security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

public class KeyGenerator {
    private final static String ALGORITHM = "RSA";
    private final static int KEY_SIZE = 1024;

    private static KeyPair generateKeyPair() throws Exception{
        KeyPairGenerator kpg = KeyPairGenerator.getInstance(ALGORITHM);
        kpg.initialize(KEY_SIZE);

        return kpg.generateKeyPair();
    }

    private static String getPrivateKeyString(KeyPair keyPair){
        return Base64.getMimeEncoder().encodeToString( keyPair.getPrivate().getEncoded());
    }

    private static String getPublicKeyString(KeyPair keyPair){
        return Base64.getMimeEncoder().encodeToString( keyPair.getPublic().getEncoded());
    }

    public static void main(String[] args) throws Exception{
        KeyPair keyPair = generateKeyPair();

        System.out.println("Private key:\n");

        System.out.println(getPrivateKeyString(keyPair));

        System.out.println("\n");

        System.out.println("Public key:\n");

        System.out.println(getPublicKeyString(keyPair));

    }
}

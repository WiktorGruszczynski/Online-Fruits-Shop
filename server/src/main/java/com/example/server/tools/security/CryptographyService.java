package com.example.server.tools.security;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

@Service
public class CryptographyService {
    private final PrivateKey privateKey;
    private final PublicKey publicKey;

    public CryptographyService() throws Exception
    {
        PrivateKeyLoader loader = new PrivateKeyLoader();
        this.privateKey = loader.loadPemRsaPrivateKey("src/main/resources/keys/rsa_private.pem");
        this.publicKey = loader.loadPemRsaPublicKey("src/main/resources/keys/rsa_public.pem");
    }



    public String encrypt(String message) throws Exception{
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return  Base64.getUrlEncoder().encodeToString(cipher.doFinal(message.getBytes()));
    }

    public String decrypt(String message) throws Exception{
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] encodedBytes = (cipher.doFinal(Base64.getUrlDecoder().decode(message)));
        return new String(encodedBytes, StandardCharsets.UTF_8);
    }

}

package com.example.server.tools.security;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class PrivateKeyLoader {
    private final String ALGORITHM = "RSA";

    private String readFile(final String fileName) throws IOException {
        final File file = new File(fileName);
        return new String(Files.readAllBytes(file.toPath()));
    }


    public PrivateKey loadPemRsaPrivateKey(String pemFilename) throws Exception {

        String pemString = readFile(pemFilename);

        String privateKeyPEM = pemString
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replaceAll(System.lineSeparator(), "")
                .replace("-----END PRIVATE KEY-----", "");

        byte[] encoded = Base64.getDecoder().decode(privateKeyPEM);

        KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
        return keyFactory.generatePrivate(keySpec);
    }

    public PublicKey loadPemRsaPublicKey(String pemFilename) throws Exception{
        String pemString = readFile(pemFilename);

        String publicKeyPEM = pemString
                .replace("-----BEGIN PUBLIC KEY-----","")
                .replaceAll(System.lineSeparator(), "")
                .replace("-----END PUBLIC KEY-----","");

        byte[] encoded = Base64.getDecoder().decode(publicKeyPEM);

        X509EncodedKeySpec spec = new X509EncodedKeySpec(encoded);

        KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM);
        return  keyFactory.generatePublic(spec);
    }
}

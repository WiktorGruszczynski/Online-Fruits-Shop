package com.example.server.tools.security;

import java.net.Inet4Address;
import java.net.UnknownHostException;

public class Network {
    public static String getLocalhostAddress() throws UnknownHostException {
        return Inet4Address.getLocalHost().getHostAddress();
    }
}

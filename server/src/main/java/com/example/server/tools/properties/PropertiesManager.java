package com.example.server.tools.properties;


import java.io.File;
import java.io.FileNotFoundException;
import java.util.Objects;
import java.util.Scanner;


public class PropertiesManager {

    public PropertiesManager(){
    }


    private Scanner openFile() throws FileNotFoundException {
        return new Scanner(
                new File("src/main/resources/application.properties")
        );
    }

    public String getApplicationProperty(String name) throws FileNotFoundException {
        String propertyValue = null;
        Scanner scanner = openFile();

        while (scanner.hasNextLine()){
            String[] parts = scanner.nextLine().split("=");
            if (parts.length==2 && Objects.equals(parts[1], name)){
                propertyValue = parts[1];
            }
        }

        return propertyValue;
    }
}

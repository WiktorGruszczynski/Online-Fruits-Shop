package com.example.server.tools.email;

import com.example.server.tools.properties.PropertiesManager;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;



@Service
public class EmailSenderService{
    private final String FROM;
    private final ExecutorService emailExecutor;

    @Autowired
    private JavaMailSender mailSender;
    private SimpleMailMessage simpleMailMessage;


    public EmailSenderService() throws FileNotFoundException {
        FROM = new PropertiesManager().getApplicationProperty("spring.mail.username");
        emailExecutor = Executors.newCachedThreadPool();
    }

    private String getFileContent(String path) throws FileNotFoundException {
        File file = new File(path);
        Scanner scanner = new Scanner(file);

        StringBuilder content = new StringBuilder();

        while (scanner.hasNextLine()){
            content.append(scanner.nextLine());
        }

        return content.toString();
    }


    private String getHtmlContent() throws FileNotFoundException {
        return getFileContent("src/main/resources/email page/index.html");
    }


    private String getCssContent() throws FileNotFoundException {
        return getFileContent("src/main/resources/email page/index.css");
    }


    public void sendEmail(String toEmail,
                          String subject,
                          String url) throws MessagingException, FileNotFoundException {

        String cssContent = getCssContent();
        String htmlContent = getHtmlContent()
                .replace("{ACTIVATION_URL}", url)
                .replace("{STYLESHEET}", cssContent);


        MimeMessage msg = mailSender.createMimeMessage();
        msg.setRecipients(MimeMessage.RecipientType.TO, toEmail);
        msg.setFrom(FROM);
        msg.setSubject(subject);
        msg.setContent(htmlContent, "text/html; charset=utf-8");


        emailExecutor.execute(new Runnable() {
            @Override
            public void run() {
                mailSender.send(msg);
            }
        });
    }


}

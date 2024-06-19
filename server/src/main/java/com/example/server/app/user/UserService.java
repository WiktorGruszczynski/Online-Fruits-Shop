package com.example.server.app.user;

import com.example.server.app.user.models.LoginRequestBody;
import com.example.server.app.user.models.RegisterRequestBody;
import com.example.server.app.user.models.User;
import com.example.server.tools.email.EmailSenderService;
import com.example.server.tools.responses.SuccessResponse;
import com.example.server.tools.security.AuthToken;
import com.example.server.tools.security.CryptographyService;
import com.example.server.tools.security.Hashlib;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.Objects;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private CryptographyService cryptographyService;

    private String getSeparator(){
        return String.valueOf((char) 0);
    }

    private String createRegistrationDataString(RegisterRequestBody body) throws Exception{
        String separator = getSeparator();
        return (body.getEmail() + separator + Hashlib.hash(body.getPassword()) + separator + createExpirationTimestamp());
    }

    private Long createExpirationTimestamp(){
        long currentTime = new Date().getTime();
        return (currentTime/1000 + 1800);
    }

    private String createRegistrationUrl(RegisterRequestBody body) throws Exception {
        return  "http://localhost:8080/api/user/register/" + cryptographyService.encrypt(createRegistrationDataString(body));
    }

    private Boolean isTimestampExpired(long timestamp){
        return timestamp<(new Date().getTime());
    }

    private Boolean isUserRegistered(String email){
        return userRepository.findByEmailAddress(email) != null;
    }


    public SuccessResponse<String> verifyUserEmail(RegisterRequestBody body) throws Exception{
        if (!isUserRegistered(body.getEmail())){
            String registrationUrl = createRegistrationUrl(body);

            emailSenderService.sendEmail(body.getEmail(), "Confirm your email", registrationUrl);

            return new SuccessResponse<>(true);
        }
        else {
            return new SuccessResponse<>(false, null, "email is already taken");
        }
    }


    public String registerUser(String encryptedRegisterData){
        try {
            String data = cryptographyService.decrypt(encryptedRegisterData);

            String[] registrationData = data.split(getSeparator());

            String email = registrationData[0];
            String hashedPassword = registrationData[1];
            long timestamp = Long.parseLong(registrationData[2])*1000;

            if (!isTimestampExpired(timestamp)){
                if (!isUserRegistered(email)){
                    userRepository.save(new User(
                            email,
                            hashedPassword
                    ));

                    return "succes, you may close this window now";
                }
                else {
                    return "you are already registered";
                }
            }
            else {
                return "url is expired";
            }

        } catch (Exception exception){
            return null;
        }
    }

    public SuccessResponse<AuthToken> logInUser(LoginRequestBody loginRequestBody) throws Exception{

        if (isUserRegistered(loginRequestBody.getEmail())){
            User user = userRepository.findByEmailAddress(loginRequestBody.getEmail());

            if (Objects.equals(Hashlib.hash(loginRequestBody.getPassword()), user.getHashedPassword())){
                AuthToken authToken = new AuthToken();
                authToken.generateFromEmail(loginRequestBody.getEmail());

                return new SuccessResponse<>(true, authToken);
            }
        }

        return new SuccessResponse<>(false, null, "Incorrect password or email");
    }
}

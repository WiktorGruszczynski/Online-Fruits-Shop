package com.example.server.app.user;

import com.example.server.app.user.models.LoginRequestBody;
import com.example.server.app.user.models.RegisterRequestBody;
import com.example.server.tools.responses.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {
    @Autowired
    private final UserService userService;


    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping(path = "/verify_email")
    public SuccessResponse<String> verifyUserEmail(@RequestBody RegisterRequestBody registerRequestBody) throws Exception{
        return userService.verifyUserEmail(registerRequestBody);
    }

    @GetMapping(path = "/register/{encryptedData}")
    public String registerUser(@PathVariable("encryptedData") String encryptedData){
        return userService.registerUser(encryptedData);
    }

    @PostMapping(path = "/login")
    public SuccessResponse<?> loginUser(@RequestBody LoginRequestBody loginRequestBody) throws Exception{
        return userService.logInUser(loginRequestBody);
    }


}

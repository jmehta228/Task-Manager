package com.msd.Task_Manager.controller;

import com.msd.Task_Manager.model.LoginModel;
import com.msd.Task_Manager.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private LoginRepository loginRepository;

    @PostMapping
    public boolean login(@RequestBody LoginModel login) {
        Optional<LoginModel> user = loginRepository.findByUsernameAndPassword(
                login.getUsername(), login.getPassword()
        );
        return user.isPresent();
    }
}

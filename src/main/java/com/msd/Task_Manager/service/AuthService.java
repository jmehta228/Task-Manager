package com.msd.Task_Manager.service;

import com.msd.Task_Manager.dto.*;
import com.msd.Task_Manager.model.UserModel;
import com.msd.Task_Manager.repository.UserRepository;
import com.msd.Task_Manager.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtUtil jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    public void register(RegisterRequest req) {
        users.findByEmail(req.email()).ifPresent(u -> { throw new RuntimeException("Email already used"); });
        var user = new UserModel(req.email(), encoder.encode(req.password()));
        users.save(user);
    }

    public AuthResponse login(LoginRequest req) {
        var user = users.findByEmail(req.email())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!encoder.matches(req.password(), user.getPasswordHash()))
            throw new RuntimeException("Invalid email or password");

        String token = jwt.generate(user.getId(), user.getEmail());
        return new AuthResponse(token);
    }
}

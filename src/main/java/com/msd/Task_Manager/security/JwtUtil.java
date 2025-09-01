package com.msd.Task_Manager.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    // For dev you can inline; in prod load from env/secret manager
    private final Key key = Keys.hmacShaKeyFor(
            System.getenv().getOrDefault("JWT_SECRET", "change-me-please-change-me-please-32bytes").getBytes());

    public String generate(String userId, String email) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(userId)                 // sub = userId
                .claim("email", email)              // handy on the client
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + 1000L * 60 * 60 * 24 * 7)) // 7 days
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}

//package com.msd.Task_Manager.security;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.*;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import java.io.IOException;
//import java.util.List;
//
//@Component
//public class JwtAuthFilter extends OncePerRequestFilter {
//    private final JwtUtil jwt;
//
//    public JwtAuthFilter(JwtUtil jwt) { this.jwt = jwt; }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
//            throws ServletException, IOException {
//        String header = req.getHeader("Authorization");
//        if (header != null && header.startsWith("Bearer ")) {
//            String token = header.substring(7);
//            try {
//                var claims = jwt.parse(token).getBody();
//                String userId = claims.getSubject();
//                // Put userId into the SecurityContext as the principal name
//                var auth = new UsernamePasswordAuthenticationToken(userId, null, List.of());
//                SecurityContextHolder.getContext().setAuthentication(auth);
//            } catch (Exception ignored) {}
//        }
//        chain.doFilter(req, res);
//    }
//}








package com.msd.Task_Manager.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwt;

    public JwtAuthFilter(JwtUtil jwt) { this.jwt = jwt; }

    // 1) Skip /auth/** and preflight requests entirely
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return true;   // preflight
        return path.startsWith("/auth/");                                   // login/register
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {
        String header = req.getHeader("Authorization");

        // 2) No header? Just continue.
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        // 3) Parse token; if anything fails, continue without auth.
        try {
            var claims = jwt.parse(header.substring(7)).getBody();
            String userId = claims.getSubject();

            // If you store roles/authorities in claims, map them here; else keep empty list.
            var auth = new UsernamePasswordAuthenticationToken(userId, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception ignored) {
            // invalid/expired token -> act as anonymous, don't block
        }

        chain.doFilter(req, res);
    }
}

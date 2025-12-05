package com.example.quiz_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AdminTokenFilter extends OncePerRequestFilter {

    private final String expectedToken;

    public AdminTokenFilter(
            @Value("${admin.api.token}") String expectedToken
    ) {
        this.expectedToken = expectedToken;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // 1) Always let CORS preflight through
        if ("OPTIONS".equalsIgnoreCase(method)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2) Treat only non-GET requests to /api/questions as admin-only
        boolean isQuestionModification =
                path.startsWith("/api/questions") &&
                        !method.equalsIgnoreCase("GET");

        if (!isQuestionModification) {
            filterChain.doFilter(request, response);
            return;
        }

        String headerToken = request.getHeader("X-Admin-Token");

        if (headerToken == null || !headerToken.equals(expectedToken)) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter()
                    .write("{\"error\":\"Unauthorized: missing or invalid admin token\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }
}

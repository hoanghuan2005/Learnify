package com.example.learnify.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String JWT_COOKIE_NAME = "jwt";

    private final JwtService jwtService;
    public JwtAuthenticationFilter(JwtService jwtService) { this.jwtService = jwtService; }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            var current = SecurityContextHolder.getContext().getAuthentication();
            boolean isAnonymous = current instanceof AnonymousAuthenticationToken;

            if (current == null || isAnonymous) {
                String token = extractToken(request);              // Bearer hoặc cookie 'jwt'
                if (StringUtils.hasText(token) && jwtService.isTokenValid(token)) {
                    Jwt jwt = jwtService.decodeToken(token);
                    String email = jwt.getSubject();
                    String role  = jwt.getClaim("role");

                    if (StringUtils.hasText(email)) {
                        var authority = new SimpleGrantedAuthority("ROLE_" + (StringUtils.hasText(role) ? role : "USER"));
                        var auth = new UsernamePasswordAuthenticationToken(email, null, List.of(authority));
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        } catch (Exception ex) {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String h = request.getHeader(AUTH_HEADER);
        if (StringUtils.hasText(h) && h.startsWith(BEARER_PREFIX)) return h.substring(BEARER_PREFIX.length());
        Cookie[] cs = request.getCookies();
        if (cs != null) for (Cookie c : cs) if ("jwt".equals(c.getName()) && StringUtils.hasText(c.getValue())) return c.getValue();
        return null;
    }
}

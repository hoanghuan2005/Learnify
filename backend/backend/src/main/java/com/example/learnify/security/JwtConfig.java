package com.example.learnify.security;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.KeyUse;
import com.nimbusds.jose.jwk.OctetSequenceKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.jwt.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Configuration
public class JwtConfig {

    @Value("${jwt.current-secret}") // active
    private String currentSecret;

    @Value("${jwt.previous-secrets:}") // optional, comma-separated
    private String previousSecrets;

    @Bean
    public List<SecretKey> secretKeys() {
        List<SecretKey> keys = new ArrayList<>();
        if (previousSecrets != null && !previousSecrets.isBlank()) {
            for (String s : previousSecrets.split(",")) {
                keys.add(secretFromBase64(s.trim()));
            }
        }
        keys.add(secretFromBase64(currentSecret)); // latest key last
        return keys;
    }

    private SecretKey secretFromBase64(String secret) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        if (keyBytes.length < 32) throw new IllegalArgumentException("Secret must be at least 32 bytes for HS256");
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    @Bean
    @Primary
    public JwtEncoder jwtEncoder() {
        SecretKey latest = secretFromBase64(currentSecret);
        OctetSequenceKey jwk = new OctetSequenceKey.Builder(latest.getEncoded())
                .keyUse(KeyUse.SIGNATURE)
                .algorithm(JWSAlgorithm.HS256)
                .build();
        return new NimbusJwtEncoder(new ImmutableJWKSet<>(new JWKSet(jwk)));
    }

    @Bean
    @Primary
    public JwtDecoder jwtDecoder(List<SecretKey> keys) {
        return token -> {
            for (SecretKey key : keys) {
                try {
                    return NimbusJwtDecoder.withSecretKey(key).build().decode(token);
                } catch (JwtException e) {
                }
            }
            throw new JwtException("Token signature cannot be verified by any known key");
        };
    }
}

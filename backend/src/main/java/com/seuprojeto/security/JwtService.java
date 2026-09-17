package com.seuprojeto.security;

import com.seuprojeto.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    // Usando um segredo forte e em ambiente de produção, este valor viria de variáveis de ambiente.
    // Para fins de exemplo, usaremos uma chave segura gerada.
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Adicionar informações de Role ou outros claims se necessário.
        return generateTokenInternal(claims, userDetails.getUsername());
    }

    private String generateTokenInternal(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(Keys.secretKeyFor(SignatureAlgorithm.HS256), jwtSecret) // Usar a chave configurada
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.secretKeyFor(SignatureAlgorithm.HS256), jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // Assumindo que o email é o subject do token
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String emailFromToken = extractEmail(token);
            return (emailFromToken != null && emailFromToken.equals(userDetails.getUsername()))
                    && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            return !Jwts.parserBuilder()
                    .setSigningKey(Keys.secretKeyFor(SignatureAlgorithm.HS256), jwtSecret)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return true; // Token expirado ou inválido
        }
    }
}
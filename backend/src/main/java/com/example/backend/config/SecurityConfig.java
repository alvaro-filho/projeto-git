package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desabilita CSRF
            .csrf(AbstractHttpConfigurer::disable)
            
            // 2. Configura CORS
            .cors(cors -> {
                cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    // Adiciona as origens permitidas (incluindo http://localhost:8081)
                    configuration.setAllowedOrigins(java.util.Arrays.asList("http://localhost:5173", "http://localhost:3000", "http://localhost:8081"));
                    // Permite todos os métodos e headers
                    configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    configuration.setAllowedHeaders(java.util.Arrays.asList("*"));
                    configuration.setAllowCredentials(true);
                    return configuration;
                });
            })

            // 3. Configura as regras de autorização
            .authorizeHttpRequests(auth -> auth
                    // Permitir acesso não autenticado especificamente no login e em todos os endpoints de auth
                    .requestMatchers("/api/v1/auth/login").permitAll()
                    .requestMatchers("/api/v1/auth/**").permitAll()
                    // Todas as outras requisições exigem autenticação
                    .anyRequest().authenticated()
            )

                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            
            // 4. Define a política de sessão como stateless
            .sessionManagement(session -> session.sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
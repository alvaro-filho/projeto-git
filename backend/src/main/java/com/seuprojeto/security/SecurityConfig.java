package com.seuprojeto.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.audiences;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seuprojeto.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;

    /**
     * Configura o Encoder de Senhas usando BCrypt.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura a cadeia de filtros de segurança (SecurityFilterChain).
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Desabilita CSRF, pois usaremos JWTs
                .csrf(AbstractHttpConfigurer::disable)
                // Permite o uso de sessão stateless (necessário para JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(org.springframework.security.config.session.SessionCreationPolicy.STATELESS))
                // Configura as autorizações
                .authorizeHttpRequests(authorize -> authorize
                        // Permitir acesso público aos endpoints de autenticação
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        // Exigir autenticação para todas as outras rotas
                        .anyRequest().authenticated()
                )
                // Adiciona nosso filtro JWT antes do filtro padrão de sessão
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
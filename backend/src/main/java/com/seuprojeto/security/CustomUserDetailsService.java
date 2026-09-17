package com.seuprojeto.security;

import com.seuprojeto.model.User;
import com.seuprojeto.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // O Spring Security espera um UserDetails.
        // Vamos mapear nosso User para um UserDetails em memória para este exemplo.
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Usuário não encontrado com e-mail: " + email);
        }

        User user = userOptional.get();
        
        // Implementação simplificada para UserDetails.
        // Em um projeto real, seria melhor criar um User.java que implemente UserDetails.
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail()) // Usando email como nome de usuário
                .password(user.getSenha())
                .authorities("ROLE_" + user.getRole().name()) // Mapeia o Role Enum para ROLE_
                .build();
    }
}
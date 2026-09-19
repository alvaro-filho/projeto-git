package com.example.backend.config;

import com.example.backend.models.Role;
import com.example.backend.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserService userService;

    public DataLoader(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Dados de teste: admin@atelie.com / 123456
        String adminEmail = "admin@atelie.com";
        String adminUsername = "admin";
        String defaultPassword = "123456";

        // Verifica se o usuário já existe para evitar exceções
        try {
            // Tenta registrar o usuário admin. A lógica de 'findByEmail' no UserService deve tratar duplicatas.
            userService.registerUser(adminUsername, adminEmail, defaultPassword, Role.ARTIST);
            System.out.println("===================================================");
            System.out.println("✅ USUÁRIO ADMINISTRADOR DE TESTE CARREGADO COM SUCESSO:");
            System.out.println("   Email: " + adminEmail);
            System.out.println("   Username: " + adminUsername);
            System.out.println("   Senha: " + defaultPassword);
            System.out.println("===================================================");
        } catch (RuntimeException e) {
            // Captura o erro de 'email já em uso' e ignora, pois é esperado se já foi rodado.
            if (e.getMessage().contains("Email já está em uso") || e.getMessage().contains("Username já está em uso")) {
                System.out.println("ℹ️ USUÁRIO ADMINISTRADOR JÁ EXISTE. Pulando carga inicial de dados.");
            } else {
                // Propaga outros erros de inicialização
                throw e;
            }
        }
    }
}
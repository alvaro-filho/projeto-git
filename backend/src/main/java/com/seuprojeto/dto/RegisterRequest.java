package com.seuprojeto.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome não deve exceder 100 caracteres")
    private String nome;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String senha;
    
    // Adicionei o campo role aqui para simplificar o fluxo de registro,
    // mas na lógica de negócio ele pode ser definido por um default ou endpoint específico.
    // Para o escopo do RF001, vou assumir que o papel padrão é ARTIST_PROFESSIONAL
    // ou que o cliente irá informar. Vou incluir um campo opcional.
    private String role;
}
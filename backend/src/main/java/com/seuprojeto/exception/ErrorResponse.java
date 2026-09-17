package com.seuprojeto.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Resposta padronizada para mensagens de erro.
 * @param code Um código interno para o erro (ex: VALIDATION_FAILED).
 * @param message A mensagem descritiva do erro.
 */
@Data
@AllArgsConstructor
public class ErrorResponse {
    private String code;
    private String message;
}
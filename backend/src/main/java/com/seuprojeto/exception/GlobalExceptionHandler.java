package com.seuprojeto.exception;

import com.seuprojeto.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Trata exceções de validação (ex: @Valid falha).
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return new ResponseEntity<>(
                new ErrorResponse("VALIDATION_FAILED", "Erro de validação de dados: " + errors),
                HttpStatus.BAD_REQUEST);
    }

    /**
     * Trata exceções de negócio customizadas (ex: usuário já existe, credenciais inválidas).
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(RuntimeException ex) {
        // Captura exceções lançadas manualmente em AuthService
        HttpStatus status;
        String code;
        String message = ex.getMessage();

        if (message != null && message.contains("Email já cadastrado")) {
            status = HttpStatus.CONFLICT;
            code = "USER_ALREADY_EXISTS";
        } else if (message != null && (message.contains("Email ou senha inválidos"))) {
            status = HttpStatus.UNAUTHORIZED;
            code = "AUTH_FAILED";
        } else {
            status = HttpStatus.BAD_REQUEST;
            code = "INTERNAL_ERROR";
        }

        return new ResponseEntity<>(
                new ErrorResponse(code, message),
                status);
    }
}
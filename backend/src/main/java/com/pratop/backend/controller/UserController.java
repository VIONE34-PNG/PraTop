package com.pratop.backend.controller;

import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pratop.backend.dto.UserDto;
import com.pratop.backend.dto.UserResponseDTO;
import com.pratop.backend.models.UserModel;
import com.pratop.backend.service.PasswordResetService;
import com.pratop.backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PasswordResetService passwordResetService;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody UserDto userDto) throws Exception {
        return userService.createUser(userDto);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<UserModel>> listarUsuarios() {
        return ResponseEntity.ok(userService.listarTodosUsuarios());
    }

    @GetMapping("/buscaPorEmail")
    public ResponseEntity<UserModel> buscarUsuarioPorEmail(@RequestParam String email) throws Exception {
        UserModel user = userService.buscarPorEmail(email);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/envia-token")
    public ResponseEntity<Map<String, String>> enviaResetEmail(@RequestParam String email) {
        return passwordResetService.enviaTokenRest(email);
    }

    @PostMapping("/verifica-token")
    public ResponseEntity<String> verificaCodigo(@RequestParam String token, @RequestParam String code) {
        boolean isValid = passwordResetService.validaTokenReset(token, code);
        if (isValid) {
            return ResponseEntity.ok("Código válido");
        }
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body("Código inválido ou expirado.");
    }

    // Reseta a senha
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token,
            @RequestParam String novaPassword) throws Exception {

        return passwordResetService.resetPassword(token, novaPassword);
    }

    @GetMapping("/buscaPorToken")
    public ResponseEntity<UserResponseDTO> getUsuarioPorToken(
            @RequestHeader("Authorization") String token) {
        return userService.buscaPorToken(token);
    }
}

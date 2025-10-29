package com.pratop.backend.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pratop.backend.models.UserModel;
import com.pratop.backend.repository.UserRepository;
import com.pratop.backend.security.JwtUtil;
import com.pratop.backend.security.PasswordEncrypt;

@Service
public class PasswordResetService {
    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Map<String, String>> enviaTokenRest(String email) {
        Optional<UserModel> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("erro", "E-mail não encontrado"));
        }

        String token = jwtUtil.generateResetToken(email);
        String resetCode = jwtUtil.extractCode(token);

        String subject = "PraTop - Redefinição de Senha";
        String message = "Código para seguir com a redefinição de snha: \n" + resetCode +
                "\nO código é válido por 5 minutos.";

        emailService.enviaEmail(email, subject, message);

        return ResponseEntity.ok(Map.of("jwt", token));

    }

    public boolean validaTokenReset(String token, String code) {
        // Valida o token JWT
        if (jwtUtil.validateToken(token)) {
            // Extrai o código do token
            String tokenCode = jwtUtil.extractCode(token);
            // Compara com o código enviado pelo usuário
            return tokenCode.equals(code);
        }
        return false;
    }

    public ResponseEntity<String> resetPassword(String token, String novaPassword) throws Exception {
        String email = jwtUtil.extractUsername(token);
        Optional<UserModel> user = userRepository.findByEmail(email);

        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        UserModel userExist = user.get();
        
        String passwordEncrypted = PasswordEncrypt.encrypt(novaPassword);
        userExist.setPassword(passwordEncrypted);

        userRepository.save(userExist);

        return ResponseEntity.ok().body("Senha atualizada com sucesso");
    }
}

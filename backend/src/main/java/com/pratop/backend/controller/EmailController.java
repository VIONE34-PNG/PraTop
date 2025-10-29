package com.pratop.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pratop.backend.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    EmailService emailService;

    //Método apenas para testes
    @PostMapping("/enviar")//O MAP nos parâmetros ele mapeou a deserializou o JSON
    public ResponseEntity<String> enviarEmail(@RequestBody Map<String, String> request) {

        String userEmail = request.get("userEmail");

        if (userEmail == null || userEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("O e-mail do destinatário não foi informado.");
        }

        String assunto = "PraTop - Código para redefinição de senha";
        String mensagem = "Segue abaixo o código para redefinir sua senha no PraTop.";

        String resposta = emailService.enviaEmail(userEmail, assunto, mensagem);

        return ResponseEntity.ok(resposta);
    }
}

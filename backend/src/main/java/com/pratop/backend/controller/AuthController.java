package com.pratop.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pratop.backend.dto.UserDto;
import com.pratop.backend.service.AuthGoogleService;
import com.pratop.backend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthGoogleService authService;

    // Login pelo Google
    @PostMapping("/google")
    public ResponseEntity<Map<String, String>> googleLoginAuth(@RequestBody(required = false) Map<String, String> body) {
        if (body == null || !body.containsKey("token") || body.get("token") == null) {
            return ResponseEntity.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Token não enviado no body"));
        }

        String idToken = body.get("token");
        return authService.googleLogin(idToken);
    }

    // Login nativo do app
    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody UserDto userDto) throws Exception {
        return userService.userLogin(userDto);
    }
}
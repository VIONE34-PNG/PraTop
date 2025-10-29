package com.pratop.backend.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pratop.backend.models.TipoLogin;
import com.pratop.backend.models.UserModel;
import com.pratop.backend.repository.UserRepository;
import com.pratop.backend.security.JwtUtil;

@Service
public class AuthGoogleService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GoogleTokenVerifier googleTokenVerifier;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<Map<String, String>> googleLogin(String token) {
        var payload = googleTokenVerifier.verifyToken(token);

        String email = payload.getEmail();
        String fotoUrl = (String) payload.get("picture");
        String googleId = payload.getSubject();

        Optional<UserModel> userOpt = userRepository.findByEmail(email);
        UserModel user;

        if (userOpt.isPresent()) {
            user = userOpt.get();

            user.setFotoUrl(fotoUrl);
            ;
        } else {
            user = UserModel.builder()
                    .email(email)
                    .fotoUrl(fotoUrl)
                    .googleId(googleId)
                    .tipo(TipoLogin.GOOGLE)
                    .status(true)
                    .build();
        }

        userRepository.save(user);

        String jwt = jwtUtil.generateToken(email);

        return ResponseEntity.ok(Map.of("jwt", jwt));
    }
}

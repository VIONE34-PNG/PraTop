package com.pratop.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pratop.backend.dto.UserDto;
import com.pratop.backend.dto.UserResponseDTO;
import com.pratop.backend.models.TipoLogin;
import com.pratop.backend.models.UserModel;
import com.pratop.backend.repository.UserRepository;
import com.pratop.backend.security.JwtUtil;
import com.pratop.backend.security.PasswordEncrypt;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    // Método para criar usuário local
    public ResponseEntity<String> createUser(UserDto userDto) throws Exception {
        Optional<UserModel> userOpt = userRepository.findByEmail(userDto.getEmail());
        ObjectMapper mapper = new ObjectMapper();

        if (userOpt.isPresent()) {
            String json = mapper.writeValueAsString(Map.of("erro", "E-mail já cadastrado."));
            return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(json);
        }

        if (userDto.getPassword().isEmpty()) {
            String json = mapper.writeValueAsString(Map.of("erro", "Senha não informada"));
            return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(json);
        }

        String passwordEncrypted = PasswordEncrypt.encrypt(userDto.getPassword());

        UserModel user = UserModel.builder()
                .email(userDto.getEmail())
                .password(passwordEncrypted)
                .tipo(TipoLogin.LOCAL)
                .status(true)
                .build();

        userRepository.save(user);

        String json = mapper.writeValueAsString(Map.of("mensagem", "Usuário cadastrado com sucesso"));
        return ResponseEntity.status(HttpStatus.SC_CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(json);
    }

    // Login local
    public ResponseEntity<String> userLogin(UserDto userDto) throws Exception {
        Optional<UserModel> userOpt = userRepository.findByEmail(userDto.getEmail());
        ObjectMapper mapper = new ObjectMapper();

        if (userOpt.isEmpty()) {
            String json = mapper.writeValueAsString(Map.of("erro", "E-mail ou senha incorretos"));
            return ResponseEntity.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(json);
        }

        UserModel userExist = userOpt.get();

        if (userExist.getTipo() != TipoLogin.LOCAL) {
            String json = mapper.writeValueAsString(Map.of("erro", "Conta cadastrada pelo Google."));
            return ResponseEntity.status(HttpStatus.SC_FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(json);
        }

        String encryptedPassword = PasswordEncrypt.encrypt(userDto.getPassword());

        if (!userExist.getPassword().equals(encryptedPassword)) {
            String json = mapper.writeValueAsString(Map.of("erro", "E-mail ou senha incorretos"));
            return ResponseEntity.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(json);
        }

        String jwt = jwtUtil.generateToken(userExist.getEmail());
        String json = mapper.writeValueAsString(Map.of("jwt", jwt));

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(json);
    }

    // Lista todos os usuários
    public List<UserModel> listarTodosUsuarios() {
        return userRepository.findAll();
    }

    // Busca usuário por e-mail
    public UserModel buscarPorEmail(String email) throws Exception {
        Optional<UserModel> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            return userOpt.get();
        }
        throw new Exception("Usuário não encontrado");
    }

    // Busca usuário pelo token
    public ResponseEntity<UserResponseDTO> buscaPorToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String email = jwtUtil.extractUsername(token);
        Optional<UserModel> user = userRepository.findByEmail(email);

        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        UserResponseDTO response = new UserResponseDTO(user.get());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}

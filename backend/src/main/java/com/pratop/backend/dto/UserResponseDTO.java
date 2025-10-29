package com.pratop.backend.dto;

import com.pratop.backend.models.TipoLogin;
import com.pratop.backend.models.UserModel;

import lombok.Data;

@Data
public class UserResponseDTO {

    private Long id;
    private String email;
    private String fotoUrl;
    private boolean status;
    private TipoLogin tipo;

    public UserResponseDTO(UserModel user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.fotoUrl = user.getFotoUrl();
        this.status = user.isStatus();
        this.tipo = user.getTipo();
    }
}

package com.andibardas.Task.Manager.dto;

import com.andibardas.Task.Manager.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}

package com.andibardas.Task.Manager.dto;

import com.andibardas.Task.Manager.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;
}

package com.andibardas.Task.Manager.services.admin;

import com.andibardas.Task.Manager.dto.UserDto;
import com.andibardas.Task.Manager.entities.User;
import com.andibardas.Task.Manager.enums.UserRole;
import com.andibardas.Task.Manager.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService implements IAdminService{
    private final UserRepository userRepository;

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
                .map(User::getUserDto)
                .collect(Collectors.toList());
    }
}

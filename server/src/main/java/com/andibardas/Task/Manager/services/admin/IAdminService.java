package com.andibardas.Task.Manager.services.admin;

import com.andibardas.Task.Manager.dto.UserDto;

import java.util.List;

public interface IAdminService {
    List<UserDto> getUsers();
}

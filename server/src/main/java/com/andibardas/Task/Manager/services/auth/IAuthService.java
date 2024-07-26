package com.andibardas.Task.Manager.services.auth;

import com.andibardas.Task.Manager.dto.SignupRequest;
import com.andibardas.Task.Manager.dto.UserDto;

public interface IAuthService {
    UserDto signupUser(SignupRequest signupRequest);
    boolean hasUserWithEmail(String email);
}

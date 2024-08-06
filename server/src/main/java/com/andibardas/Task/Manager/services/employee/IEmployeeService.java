package com.andibardas.Task.Manager.services.employee;

import com.andibardas.Task.Manager.dto.TaskDto;

import java.util.List;

public interface IEmployeeService {
    List<TaskDto> getTasksByUserId();

    TaskDto updateTask(Long id, String status);
}

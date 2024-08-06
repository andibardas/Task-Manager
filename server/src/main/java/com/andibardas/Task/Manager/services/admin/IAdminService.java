package com.andibardas.Task.Manager.services.admin;

import com.andibardas.Task.Manager.dto.CommentDto;
import com.andibardas.Task.Manager.dto.TaskDto;
import com.andibardas.Task.Manager.dto.UserDto;

import java.util.List;

public interface IAdminService {
    List<UserDto> getUsers();
    TaskDto createTask(TaskDto taskDto);

    List<TaskDto> getAllTasks();

    void deleteTask(Long id);

    TaskDto getTaskById(Long id);

    TaskDto updateTask(Long id, TaskDto taskDto);

    List<TaskDto> searchTaskByTitle(String title);

    CommentDto createComment(Long taskId, String content);
}

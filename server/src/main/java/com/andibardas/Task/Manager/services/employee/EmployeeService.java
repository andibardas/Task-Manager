package com.andibardas.Task.Manager.services.employee;

import com.andibardas.Task.Manager.dto.TaskDto;
import com.andibardas.Task.Manager.entities.Task;
import com.andibardas.Task.Manager.entities.User;
import com.andibardas.Task.Manager.enums.TaskStatus;
import com.andibardas.Task.Manager.repositories.TaskRepository;
import com.andibardas.Task.Manager.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService implements IEmployeeService {
    private final TaskRepository taskRepository;
    private final JwtUtil jwtUtil;
    @Override
    public List<TaskDto> getTasksByUserId() {
        User user = jwtUtil.getLoggedInUser();
        if(user != null){
            return taskRepository.findAllByUserId(user.getId())
                    .stream()
                    .sorted(Comparator.comparing(Task::getDueDate).reversed())
                    .map(Task::getTaskDto)
                    .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not found");
    }

    @Override
    public TaskDto updateTask(Long id, String status) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if(optionalTask.isPresent()){
            Task existingTask = optionalTask.get();
            existingTask.setStatus(mapStringToStatus(status));
            return taskRepository.save(existingTask).getTaskDto();
        }
        throw new EntityNotFoundException("Task not found");
    }

    private TaskStatus mapStringToStatus(String status){
        return switch (status){
            case "PENDING" -> TaskStatus.PENDING;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            default -> TaskStatus.CANCELED;
        };
    }
}

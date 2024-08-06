package com.andibardas.Task.Manager.controller.employee;

import com.andibardas.Task.Manager.dto.TaskDto;
import com.andibardas.Task.Manager.services.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByUserId(){
        return ResponseEntity.ok(employeeService.getTasksByUserId());
    }

    @GetMapping("/task/{id}/{status}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @PathVariable String status){
        TaskDto updatedTaskDto = employeeService.updateTask(id, status);
        if(updatedTaskDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedTaskDto);
    }
}

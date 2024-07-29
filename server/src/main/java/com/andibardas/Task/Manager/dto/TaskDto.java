package com.andibardas.Task.Manager.dto;

import com.andibardas.Task.Manager.enums.TaskStatus;
import lombok.Data;

import java.util.Date;

@Data
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private Date dueDate;
    private String priority;
    private TaskStatus status;
    private Long employeeId;
    private String employeeName;
}

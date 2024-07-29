package com.andibardas.Task.Manager.entities;

import com.andibardas.Task.Manager.dto.TaskDto;
import com.andibardas.Task.Manager.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date dueDate;
    private String priority;
    private TaskStatus status;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public TaskDto getTaskDto(){
        TaskDto taskDto = new TaskDto();
        taskDto.setId(this.id);
        taskDto.setTitle(this.title);
        taskDto.setDescription(this.description);
        taskDto.setDueDate(this.dueDate);
        taskDto.setPriority(this.priority);
        taskDto.setStatus(this.status);
        taskDto.setEmployeeId(this.user.getId());
        taskDto.setEmployeeName(this.user.getName());
        return taskDto;
    }
}

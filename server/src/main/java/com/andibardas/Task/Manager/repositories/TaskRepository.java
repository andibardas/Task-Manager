package com.andibardas.Task.Manager.repositories;

import com.andibardas.Task.Manager.dto.TaskDto;
import com.andibardas.Task.Manager.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByTitleContainingIgnoreCase(String title);

    List<Task> findAllByUserId(Long user_id);
}

package com.andibardas.Task.Manager.repositories;

import com.andibardas.Task.Manager.dto.CommentDto;
import com.andibardas.Task.Manager.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByTaskId(Long taskId);
}

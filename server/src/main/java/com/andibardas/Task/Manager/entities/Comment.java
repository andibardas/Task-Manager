package com.andibardas.Task.Manager.entities;

import com.andibardas.Task.Manager.dto.CommentDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Task task;

    public CommentDto getCommentDto(){
        CommentDto commentDto = new CommentDto();
        commentDto.setId(this.id);
        commentDto.setContent(this.content);
        commentDto.setCreatedAt(this.createdAt);
        commentDto.setUserId(this.user.getId());
        commentDto.setTaskId(this.task.getId());
        commentDto.setPostedBy(this.user.getName());
        return commentDto;
    }
}

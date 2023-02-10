package com.exercise.springbootlibrary.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "review")
@Data
public class Review {
    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column
    @CreationTimestamp
    private Date date;
    @Column
    private double rating;
    @Column(name = "book_id")
    private Long bookId;
    @Column(name = "review_description")
    private String reviewDescription;
}

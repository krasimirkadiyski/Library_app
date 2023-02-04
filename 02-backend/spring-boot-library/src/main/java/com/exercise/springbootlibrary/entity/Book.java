package com.exercise.springbootlibrary.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "book")
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String title;
    @Column
    private String author;
    @Column
    private String description;
    @Column
    private int copies;
    @Column(name = "copies_available")
    private int  copiesAvailable;
    @Column
    private String category;
    @Column
    private String img;

}

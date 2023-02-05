package com.exercise.springbootlibrary.dao;

import com.exercise.springbootlibrary.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;



@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    //http://localhost:8080/api/books/search/findByTitleContaining?title=guru това идва от pageable-->&page=0&size=5
    //spring rest автоматично генерира този rest api само чрез създаването на това query
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);
}

package com.exercise.springbootlibrary.web;

import com.exercise.springbootlibrary.dtos.LoginDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

@PostMapping("/login")
public boolean login(@RequestBody LoginDto loginDto){
    System.out.println();
    System.out.println(loginDto);
return true;
}

}

package com.rivu.SpringEcom.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String greet() {
        return "Hello, welcome to Spring E-commerce!";
    }
}

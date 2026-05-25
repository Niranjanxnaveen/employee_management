package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Employee;
import com.example.demo.service.EmployeeService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Register API
    @PostMapping("/register")
    public String registerEmployee(@RequestBody Employee employee) {

        employeeService.registerEmployee(employee);

        return "Employee Registered Successfully!";
    }

    // Login API
    @PostMapping("/login")
    public String loginEmployee(@RequestBody Employee employee) {

        boolean isValid = employeeService.loginEmployee(
                employee.getEmail(),
                employee.getPassword()
        );

        if (isValid) {
            return "Login Successful!";
        } else {
            return "Invalid Email or Password!";
        }
    }
}
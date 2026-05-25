package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Register Employee
    public Employee registerEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Login Employee
    public Employee loginEmployee(String email, String password) {

        Optional<Employee> employee = employeeRepository.findByEmail(email);

        if (employee.isPresent()) {

            Employee existingEmployee = employee.get();

            if (existingEmployee.getPassword().equals(password)) {
                return existingEmployee;
            }
        }

        return null;
    }
}
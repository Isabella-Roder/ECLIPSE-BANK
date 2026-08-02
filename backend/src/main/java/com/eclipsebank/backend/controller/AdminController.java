package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.LoginRequest;
import com.eclipsebank.backend.dto.LoginResponse;
import com.eclipsebank.backend.model.Admin;
import com.eclipsebank.backend.service.AdminService;

@RestController
public class AdminController {
    
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/admins")
    public List<Admin> listar() {
        return adminService.listar();
    }

    @PostMapping("/admins")
    public Admin cadastrar(@RequestBody Admin admin) {
        return adminService.cadastrar(admin);
    }

    @PostMapping("/login/admin")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return adminService.login(request);
    }


}

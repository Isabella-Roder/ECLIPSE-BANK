package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.LoginRequest;
import com.eclipsebank.backend.dto.LoginResponse;
import com.eclipsebank.backend.enums.PerfilTipo;
import com.eclipsebank.backend.model.Admin;
import com.eclipsebank.backend.repository.AdminRepository;

@Service
public class AdminService {
    
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> listar() {
        return adminRepository.findAll();
    }

    private void verificacoes(Admin admin) {
        if (admin.getNome() == null || admin.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome obrigatorio.");
        } else if (admin.getEmail() == null || admin.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email obrigatorio.");
        } else if (admin.getSenha() == null || admin.getSenha().isBlank()) {
            throw new IllegalArgumentException("Senha obrigatorio.");
        }
    }

    public Admin cadastrar(Admin admin) {
        verificacoes(admin);

        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new IllegalArgumentException("Email ja cadastrado.");
        }

        return adminRepository.save(admin);
    }

    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Email ou senha invalidos."));

        if (!admin.getSenha().equals(request.getSenha())) {
            throw new IllegalArgumentException("Email ou senha invalidos.");
        }

        return new LoginResponse(
            admin.getId(),
            admin.getNome(),
            admin.getEmail(),
            PerfilTipo.ADMIN
        );
    }
}

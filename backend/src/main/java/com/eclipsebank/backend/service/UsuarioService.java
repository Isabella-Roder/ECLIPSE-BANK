package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.LoginRequest;
import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.repository.UsuarioRepository;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.dto.AberturaContaRequest;
import com.eclipsebank.backend.service.ContaService;

@Service
public class UsuarioService {
    
    private UsuarioRepository usuarioRepository;
    private ContaService contaService;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario buscarPorId(Long usuarioId) {
        return usuarioRepository.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado"));
    }

    public Usuario buscarPorEmail(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Email ou senha invalidos."));

        if (!usuario.getSenha().equals(request.getSenha())) {
            throw new IllegalArgumentException("Email ou senha invalido.");
        }

        return usuario;
    }

    private void validarUsuario(Usuario usuario) {
        if (usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome não pode ser vazio.");
        }else if (usuario.getCpf() == null || usuario.getCpf().isBlank()) {
            throw new IllegalArgumentException("CPF não pode ser vazio.");
        }else if (usuario.getTelefone() == null || usuario.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone não pode ser vazio.");
        }else if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email não pode ser vazio.");
        }else if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new IllegalArgumentException("Senha não pode ser vazio.");
        }

        if (usuarioRepository.existsByCpf(usuario.getCpf())) {
            throw new IllegalArgumentException("CPF ja cadastrado.");
        }

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario cadastrar(Usuario usuario) {
        validarUsuario(usuario);
        return usuarioRepository.save(usuario);
    }

}

package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario cadastrar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

}

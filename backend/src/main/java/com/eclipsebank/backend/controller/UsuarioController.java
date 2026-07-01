package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.service.UsuarioService;

@RestController
public class UsuarioController {

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/usuarios/{usuarioId}")
        public Usuario buscarPorId(@PathVariable Long usuarioId) {
            return usuarioService.buscarPorId(usuarioId);
        }

    @PostMapping("/usuarios")
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return usuarioService.cadastrar(usuario);
    }
    
}

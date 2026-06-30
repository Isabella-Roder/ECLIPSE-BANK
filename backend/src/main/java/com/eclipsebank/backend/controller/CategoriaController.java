package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CategoriaController {
    
    @GetMapping("/categorias")
    public List<String> listar() {
        return List.of(
            "Alimentação",
            "Transporte",
            "Lazer",
            "Salário",
            "Estudos",
            "Saúde"
        );
    }

}

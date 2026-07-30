package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.CategoriaFinanceira;
import com.eclipsebank.backend.repository.CategoriaFinanceiraRepository;

@Service
public class CategoriaFinanceiraService {
    
    private final CategoriaFinanceiraRepository categoriaFinanceiraRepository;

    public CategoriaFinanceiraService(CategoriaFinanceiraRepository categoriaFinanceiraRepository) {
        this.categoriaFinanceiraRepository = categoriaFinanceiraRepository;
    }

    public List<CategoriaFinanceira> listar() {
        return categoriaFinanceiraRepository.findAll();
    }

    public List<CategoriaFinanceira> listarAtivas() {
        return categoriaFinanceiraRepository.findByAtivaTrue();
    }

    public List<CategoriaFinanceira> listarPorTipo(String tipo) {
        return categoriaFinanceiraRepository.findByTipo(tipo);
    }

    public CategoriaFinanceira buscarPorId(Long id) {
        return categoriaFinanceiraRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Categoria financeira nao encontrada."));
    }

    public void verificar(CategoriaFinanceira categoriaFinanceira) {
        if (categoriaFinanceira.getNome() == null || categoriaFinanceira.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome da categoria e obrigatorio.");
        }

        if (categoriaFinanceira.getTipo() == null || categoriaFinanceira.getTipo().isBlank()) {
            throw new IllegalArgumentException("Tipo da categoria e obrigatorio.");
        }
    }

    public CategoriaFinanceira cadastrar(CategoriaFinanceira categoriaFinanceira) {
        verificar(categoriaFinanceira);

        if (categoriaFinanceira.getAtiva() == null) {
            categoriaFinanceira.setAtiva(true);
        }

        return categoriaFinanceiraRepository.save(categoriaFinanceira);
    }

    public CategoriaFinanceira atualizar(Long id, CategoriaFinanceira dadosAtualizados) {
        CategoriaFinanceira categoria = buscarPorId(id);

        categoria.setNome(dadosAtualizados.getNome());
        categoria.setTipo(dadosAtualizados.getTipo());
        categoria.setIcone(dadosAtualizados.getIcone());
        categoria.setCor(dadosAtualizados.getCor());

        if (dadosAtualizados.getAtiva() != null) {
            categoria.setAtiva(dadosAtualizados.getAtiva());
        }

        verificar(categoria);

        return categoriaFinanceiraRepository.save(categoria);
    }

    public CategoriaFinanceira desativar(Long id) {
        CategoriaFinanceira categoria = buscarPorId(id);

        categoria.setAtiva(false);
        
        return categoriaFinanceiraRepository.save(categoria);
    }

    public void deletar(Long id) {
        CategoriaFinanceira categoria = buscarPorId(id);

        categoriaFinanceiraRepository.delete(categoria);
    }

}

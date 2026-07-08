package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.CompraCartao;
import com.eclipsebank.backend.repository.CartaoRepository;
import com.eclipsebank.backend.repository.CompraCartaoRepository;
import com.eclipsebank.backend.model.Cartao;

@Service
public class CompraCartaoService {
    
    private CompraCartaoRepository compraCartaoRepository;
    private CartaoRepository cartaoRepository;

    public CompraCartaoService(CompraCartaoRepository compraCartaoRepository, CartaoRepository cartaoRepository) {
        this.compraCartaoRepository = compraCartaoRepository;
        this.cartaoRepository = cartaoRepository;
    }

    public List<CompraCartao> listar() {
        return compraCartaoRepository.findAll();
    }

    public List<CompraCartao> listarPorCartao(Long cartaoId) {
        return compraCartaoRepository.findByCartaoId(cartaoId);
    }

    public CompraCartao comprar(Long cartaoId, CompraCartao compra) {
        Cartao cartao = cartaoRepository.findById(cartaoId).orElseThrow(() -> new IllegalArgumentException("Cartão não encontrado."));

        if (!"ATIVO".equalsIgnoreCase(cartao.getStatus())) {
            throw new IllegalArgumentException("Cartão nãp esta ativo.");
        }

        if (compra.getValor() == null || compra.getValor() <= 0) {
            throw new IllegalArgumentException("Valor de compra deve ser maior que zero.");
        }

        if (cartao.getLimiteDisponivel() == null) {
            cartao.setLimiteDisponivel(0.0);
        }

        if (compra.getValor() > cartao.getLimiteDisponivel()) {
            throw new IllegalArgumentException("Limite insuficiente no cartão.");
        }

        cartao.setLimiteDisponivel(cartao.getLimiteDisponivel() - compra.getValor());

        if (compra.getDataHora() == null) {
            compra.setDataHora(LocalDateTime.now());
        }

        if (compra.getStatus() == null || compra.getStatus().isBlank()) {
            compra.setStatus("APROVADA");
        }

        compra.setCartao(cartao);
        cartaoRepository.save(cartao);
        return compraCartaoRepository.save(compra);
    }

}

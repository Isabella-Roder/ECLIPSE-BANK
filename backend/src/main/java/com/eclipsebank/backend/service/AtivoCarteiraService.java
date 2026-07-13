package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.AtivoCarteira;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.repository.AtivoCarteiraRepository;
import com.eclipsebank.backend.repository.ContaRepository;

@Service
public class AtivoCarteiraService {

    private AtivoCarteiraRepository ativoCarteiraRepository;
    private AtivoMercadoService ativoMercadoService;
    private ContaRepository contaRepository;

    public AtivoCarteiraService(AtivoCarteiraRepository ativoCarteiraRepository, AtivoMercadoService ativoMercadoService, ContaRepository contaRepository) {
        this.ativoCarteiraRepository = ativoCarteiraRepository;
        this.ativoMercadoService = ativoMercadoService;
        this.contaRepository = contaRepository;
    }

    public List<AtivoCarteira> listarPorConta(Long contaId) {
        return ativoCarteiraRepository.findByContaId(contaId);
    }
    
    public AtivoCarteira comprar(Long contaId, AtivoCarteira ativoCarteira) {
        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (ativoCarteira.getQuantidade() == null || ativoCarteira.getQuantidade() <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero.");
        }

        if (ativoCarteira.getTicker() == null || ativoCarteira.getTicker().isBlank()) {
            throw new IllegalArgumentException("Ticker obrigatório.");
        }
        

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        var ativoMercado = ativoMercadoService.buscarPorTicker(ativoCarteira.getTicker());

        if (ativoMercado.getPrecoAtual() == null || ativoMercado.getPrecoAtual() <= 0) {
            throw new IllegalArgumentException("Preço do ativo indisponivel");
        }

        double precoAtual = ativoMercado.getPrecoAtual();
        double valorTotal = precoAtual * ativoCarteira.getQuantidade();

        if (conta.getSaldo() < valorTotal) {
            throw new IllegalArgumentException("Saldo insuficiente para comprar ativo.");
        }

        conta.setSaldo(conta.getSaldo() - valorTotal);

        ativoCarteira.setTicker(ativoMercado.getTicker());
        ativoCarteira.setNome(ativoMercado.getNome());
        ativoCarteira.setTipo(ativoMercado.getTipo());
        ativoCarteira.setPrecoMedio(precoAtual);
        ativoCarteira.setValorTotal(valorTotal);
        ativoCarteira.setDataCompra(LocalDateTime.now());
        ativoCarteira.setConta(conta);

        contaRepository.save(conta);
        return ativoCarteiraRepository.save(ativoCarteira);
    }
}

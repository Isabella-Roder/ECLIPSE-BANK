package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Investimento;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.InvestimentoRepository;

import jakarta.persistence.criteria.CriteriaBuilder.Case;

import com.eclipsebank.backend.model.Conta;

@Service
public class InvestimentoService {
    
    private InvestimentoRepository investimentoRepository;
    private ContaRepository contaRepository;

    public InvestimentoService(InvestimentoRepository investimentoRepository, ContaRepository contaRepository) {
        this.investimentoRepository = investimentoRepository;
        this.contaRepository = contaRepository;
    }

    public List<Investimento> listar() {
        return investimentoRepository.findAll();
    }

    public List<Investimento> listarPorConta(Long contaId) {
        return investimentoRepository.findByContaId(contaId);
    }

    private Double calcularRendimentoEstimado(Investimento investimento) {
        if (investimento.getValorAplicado() == null || investimento.getProduto() == null) {
            return 0.0;
        }

        double taxa = switch (investimento.getProduto()) {
            case CDB_PREFIXADO -> 0.09;
            case CDB_POS_FIXADO -> 0.08;
            case CDB_LIQUIDEZ_DIARIA -> 0.06;
            case TESOURO_PREFIXADO -> 0.085;
            case TESOURO_IPCA -> 0.095;
            case TESOURO_SELIC -> 0.07;
            case FUNDO_RENDA_FIXA -> 0.075;
            case FUNDO_MULTIMERCADO -> 0.11;
            case CRIPTO_ECLIPSE -> 0.18;
            case ACOES_ECLIPSE -> 0.13;
            case ETF_ECLIPSE -> 0.10;
        };

        return investimento.getValorAplicado() * taxa;
    }

    public Investimento aplicar(Long contaId, Investimento investimento) {
        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (investimento.getValorAplicado() == null || investimento.getValorAplicado() <= 0) {
            throw new IllegalArgumentException("Valor aplicado deve ser maior que zero.");
        }

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        if (conta.getSaldo() < investimento.getValorAplicado()) {
            throw new IllegalArgumentException("Saldo insuficiente para investir.");
        }

        if (investimento.getProduto() == null) {
            throw new IllegalArgumentException("Produto do investimento obrigatorio.");
        }

        if (investimento.getTipo() == null) {
            throw new IllegalArgumentException("Tipo do investimento obrigatorio.");
        }

        if (investimento.getPerfilInvestidor() == null) {
            throw new IllegalArgumentException("Perfil do investidor obrigatorio.");
        }

        conta.setSaldo(conta.getSaldo() - investimento.getValorAplicado());
        
        investimento.setRendimentoEstimado(calcularRendimentoEstimado(investimento));
        investimento.setDataAplicacao(LocalDateTime.now());
        investimento.setConta(conta);

        contaRepository.save(conta);
        return investimentoRepository.save(investimento);
    }

}

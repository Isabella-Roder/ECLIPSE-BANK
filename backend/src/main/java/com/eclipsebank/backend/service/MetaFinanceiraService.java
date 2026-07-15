package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eclipsebank.backend.model.MetaFinanceira;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.MetaFinanceiraRepository;
import com.eclipsebank.backend.enums.StatusMeta;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.enums.TipoTransacao;

@Service
public class MetaFinanceiraService {
    
    private MetaFinanceiraRepository metaFinanceiraRepository;
    private final ContaRepository contaRepository;
    private final TransacaoService transacaoService;

    public MetaFinanceiraService(MetaFinanceiraRepository metaFinanceiraRepository, ContaRepository contaRepository, TransacaoService transacaoService) {
        this.metaFinanceiraRepository = metaFinanceiraRepository;
        this.contaRepository = contaRepository;
        this.transacaoService = transacaoService;
    }

    public List<MetaFinanceira> listarPorConta(Long contaId) {
        return metaFinanceiraRepository.findByContaId(contaId);
    }

    @Transactional
    public MetaFinanceira criar(Long contaId, MetaFinanceira meta) {
        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));

        if (meta.getNome() == null || meta.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome da meta é obrigatório.");
        }

        if (meta.getValorAlvo() == null || meta.getValorAlvo() <= 0) {
            throw new IllegalArgumentException("Valor alvo deve ser maior que zero.");
        }

        if (meta.getValorAtual() == null) {
            meta.setValorAtual(0.0);
        }

        if (meta.getValorAtual() < 0) {
            throw new IllegalArgumentException("Valor atual não pode ser menor que zero.");
        }

        double saldoConta = conta.getSaldo() == null ? 0.0 : conta.getSaldo();

        if (meta.getValorAtual() > saldoConta) {
            throw new IllegalArgumentException("Saldo insuficiente para iniciar a meta com esse valor.");
        }

        if (meta.getValorAtual() > 0) {
            conta.setSaldo(saldoConta - meta.getValorAtual());
            contaRepository.save(conta);

            transacaoService.registrar(
                conta,
                TipoTransacao.APORTE_META,
                meta.getValorAtual(),
                "Aporte inicial na meta: " + meta.getNome(),
                "Metas"
            );
        }

        if (meta.getValorAtual() >= meta.getValorAlvo()) {
            meta.setStatus(StatusMeta.CONCLUIDA);
        } else {
            meta.setStatus(StatusMeta.EM_ANDAMENTO);
        }

        meta.setDataCriacao(LocalDateTime.now());
        meta.setConta(conta);

        return metaFinanceiraRepository.save(meta);
    }

    @Transactional
    public MetaFinanceira adicionarValor(Long metaId, Double valor) {
        MetaFinanceira meta = metaFinanceiraRepository.findById(metaId).orElseThrow(() -> new IllegalArgumentException("Meta não encontrada."));

        if (meta.getStatus() == StatusMeta.CANCELADA) {
            throw new IllegalArgumentException("Essa meta já foi cancelada.");
        } else if (meta.getStatus() == StatusMeta.CONCLUIDA) {
            throw new IllegalArgumentException("Essa meta já foi concluida");
        }

        if (valor == null || valor <= 0) {
            throw new IllegalArgumentException("Valor precisa ser maior que zero.");
        }

        Conta conta = meta.getConta();
        double saldoConta = conta.getSaldo() == null ? 0.0 : conta.getSaldo();

        if (saldoConta < valor) {
            throw new IllegalArgumentException("Saldo insuficiente para adicionar valor na meta.");
        }

        conta.setSaldo(saldoConta - valor);

        Double novoValor = meta.getValorAtual() + valor;
        meta.setValorAtual(novoValor);

        if (meta.getValorAtual() >= meta.getValorAlvo()) {
            meta.setStatus(StatusMeta.CONCLUIDA);
        } else {
            meta.setStatus(StatusMeta.EM_ANDAMENTO);
        }

        contaRepository.save(conta);

        transacaoService.registrar(
            conta, 
            TipoTransacao.APORTE_META,
            valor,
            "Aporte na meta: " + meta.getNome(),
            "Metas"
        );

        return metaFinanceiraRepository.save(meta);

    }

    @Transactional
    public MetaFinanceira cancelar(Long metaId) {
        MetaFinanceira meta = metaFinanceiraRepository.findById(metaId).orElseThrow(() -> new IllegalArgumentException("Meta não encontrada."));

        if (meta.getStatus() == StatusMeta.CANCELADA) {
            throw new IllegalArgumentException("Meta já foi cancelada.");
        }

        Conta conta = meta.getConta();
        double saldoConta = conta.getSaldo() == null ? 0.0 : conta.getSaldo();

        Double valorAtual = meta.getValorAtual();

        if (valorAtual != null && valorAtual > 0) {
            conta.setSaldo(saldoConta + valorAtual);
            
            contaRepository.save(conta);

            transacaoService.registrar(
                conta,
                TipoTransacao.RESGATE_META,
                valorAtual,
                "Resgate de meta cancelada: " + meta.getNome(),
                "Metas"
            );

            meta.setValorAtual(0.0);
        }

        meta.setStatus(StatusMeta.CANCELADA);
        return metaFinanceiraRepository.save(meta);
    }

}

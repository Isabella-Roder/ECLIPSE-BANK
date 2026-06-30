package com.eclipsebank.backend.service;

import java.util.List;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.repository.UsuarioRepository;
import com.eclipsebank.backend.model.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;
import com.eclipsebank.backend.repository.TransacaoRepository;

@Service
public class ContaService {
    
    private ContaRepository contaRepository;
    private UsuarioRepository usuarioRepository;
    private TransacaoRepository transacaoRepository;

    public ContaService (ContaRepository contaRepository, UsuarioRepository usuarioRepository, TransacaoRepository transacaoRepository) {
        this.contaRepository = contaRepository;
        this.usuarioRepository = usuarioRepository;
        this.transacaoRepository = transacaoRepository;
    }

    public List<Conta> listar() {
        return contaRepository.findAll();
    }

    public Conta cadastrar(Conta conta) {
        return contaRepository.save(conta);
    }

    public Conta cadastrarParaUsuario(Long usuarioId, Conta conta) {

        if (contaRepository.existsByUsuarioId(usuarioId)) {
            throw new IllegalArgumentException("Usuário já possui uma conta.");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado."));

        conta.setUsuario(usuario);

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        return contaRepository.save(conta);
    }

    public Conta depositar(Long contaId, Double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("O valor do depósito deve ser maior que zero.");
        }

        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        Transacao transacao = new Transacao(
            "Depósito em conta",
            valor,
            TipoTransacao.DEPOSITO,
            "Depósito",
            LocalDate.now()
        );

        transacaoRepository.save(transacao);

        conta.setSaldo(conta.getSaldo() + valor);

        return contaRepository.save(conta);
    }

    public Conta sacar(Long contaId, Double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("O valor do saque deve ser maior que zero.");
        }

        Conta conta = contaRepository.findById(contaId)
            .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        if (conta.getLimite() == null) {
            conta.setLimite(0.0);
        }

        double saldoDisponivel = conta.getSaldo() + conta.getLimite();

        if (valor > saldoDisponivel) {
            throw new IllegalArgumentException("Saldo insuficiente.");
        }

        conta.setSaldo(conta.getSaldo() - valor);

        Transacao transacao = new Transacao(
            "Saque em conta",
            valor,
            TipoTransacao.SAQUE,
            "Saque",
            LocalDate.now()
        );

        transacaoRepository.save(transacao);

        return contaRepository.save(conta);
    }

}

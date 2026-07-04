package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.TransferenciaPorNumeroRequest;
import com.eclipsebank.backend.dto.TransferenciaRequest;
import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.model.Transacao;
import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.TransacaoRepository;
import com.eclipsebank.backend.repository.UsuarioRepository;

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

    public Conta buscarPorId(Long contaId) {
        return contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta nao encontrada."));
    }

    public Conta buscarPorUsuario(Long usuarioId) {
        return contaRepository.findByUsuarioId(usuarioId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));
    }

    private void validarConta(Conta conta) {
        if (conta.getTitular() == null || conta.getTitular().isBlank()) {
            throw new IllegalArgumentException("Titular não pode ser vazio.");
        }else if (conta.getNumero() == null) {
            throw new IllegalArgumentException("Numero não pode ser vazio.");
        }else if (conta.getChavePix() == null || conta.getChavePix().isBlank()) {
            throw new IllegalArgumentException("Chave Pix não pode ser vazio.");
        }else if (conta.getLimite() == null) {
            throw new IllegalArgumentException("Limite não pode ser vazio.");
        }

        if (contaRepository.existsByNumero(conta.getNumero())) {
            throw new IllegalArgumentException("Numero da conta já existe.");
        }

        if (contaRepository.existsByChavePix(conta.getChavePix())) {
            throw new IllegalArgumentException("Essa chave pix já existe");
        }
    }

    public List<Conta> listar() {
        return contaRepository.findAll();
    }

    public Conta cadastrar(Conta conta) {
        validarConta(conta);
        return contaRepository.save(conta);
    }

    public Conta cadastrarParaUsuario(Long usuarioId, Conta conta) {
        validarConta(conta);

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

        conta.setSaldo(conta.getSaldo() + valor);
        contaRepository.save(conta);

        Transacao transacao = new Transacao(
            "Depósito em conta",
            valor,
            TipoTransacao.DEPOSITO,
            "Depósito",
            LocalDateTime.now()
        );

        transacao.setConta(conta);
        transacaoRepository.save(transacao);

        return conta;
    }

    public Conta transferir(TransferenciaRequest request) {
        Double valor = request.getValor();

        if (valor == null ||valor <= 0) {
            throw new IllegalArgumentException("O valor do depósito deve ser maior que zero.");
        }

        if (request.getContaOrigemId() == null || request.getContaDestinoId() == null) {
            throw new IllegalArgumentException("Conta de origem e destino são obrigatorias");
        }

        if (request.getContaOrigemId().equals(request.getContaDestinoId())) {
            throw new IllegalArgumentException("A conta de origem e destino devem ser diferentes.");
        }

        Conta contaOrigem = contaRepository.findById(request.getContaOrigemId()).orElseThrow(() -> new IllegalArgumentException("Conta de origem não encontrada."));
        Conta contaDestino = contaRepository.findById(request.getContaDestinoId()).orElseThrow(() -> new IllegalArgumentException("Conta de destino não encontrada."));

        if (contaOrigem.getSaldo() == null) {
            contaOrigem.setSaldo(0.0);
        }

        if (contaDestino.getSaldo() == null) {
            contaDestino.setSaldo(0.0);
        }

        if (valor > contaOrigem.getSaldo()) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }
        // subtrai da conta origem
        contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
        // soma da conta destino
        contaDestino.setSaldo(contaDestino.getSaldo() + valor);

        contaRepository.save(contaOrigem);
        contaRepository.save(contaDestino);

        Transacao transacaoOrigem = new Transacao(
            "Transferencia enviada",
            valor,
            TipoTransacao.TRANSFERENCIA,
            "Transferencia",
            LocalDateTime.now()
        );
        
        transacaoOrigem.setConta(contaOrigem);
        transacaoRepository.save(transacaoOrigem);

        Transacao transacaoDestino = new Transacao(
            "Transferencia recebida",
            valor,
            TipoTransacao.DEPOSITO,
            "Transferencia",
            LocalDateTime.now()
        );

        transacaoDestino.setConta(contaDestino);
        transacaoRepository.save(transacaoDestino);

        return contaOrigem;
    }

    public Conta TransferirPorNumero(TransferenciaPorNumeroRequest requestNum) {
        Double valor = requestNum.getValor();

        if (valor < 0) {
            throw new IllegalArgumentException("valor da transferencia deve ser maior que zero.");
        }

        Conta contaOrigem = contaRepository.findById(requestNum.getContaOrigem()).orElseThrow(() -> new IllegalArgumentException("Conta origem não encontrada."));
        Conta contaDestino = contaRepository.findByNumero(requestNum.getContaNumeroDestino()).orElseThrow(() -> new IllegalArgumentException("Conta destino não encontrada."));

        if (contaOrigem.getId().equals(contaDestino.getId())) {
            throw new IllegalArgumentException("A conta de origem e destino devem ser diferentes.");
        }

        if (contaOrigem.getSaldo() == null) {
            contaOrigem.setSaldo(0.0);
        }

        if (contaDestino.getSaldo() == null) {
            contaDestino.setSaldo(0.0);
        }

        if (valor > contaOrigem.getSaldo()) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
        contaDestino.setSaldo(contaDestino.getSaldo() + valor);

        contaRepository.save(contaOrigem);
        contaRepository.save(contaDestino);

        Transacao transacaoOrigem = new Transacao(
            "Transferencia enviada.",
            valor,
            TipoTransacao.TRANSFERENCIA,
            "Transferencia",
            LocalDateTime.now()
        );

        transacaoOrigem.setConta(contaOrigem);
        transacaoRepository.save(transacaoOrigem);

        Transacao transacaoDestino = new Transacao(
            "Transferencia recebida.",
            valor,
            TipoTransacao.DEPOSITO,
            "Transferencia",
            LocalDateTime.now()
        );

        transacaoDestino.setConta(contaDestino);
        transacaoRepository.save(transacaoDestino);

        return contaOrigem;
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
        contaRepository.save(conta);

        Transacao transacao = new Transacao(
            "Saque em conta",
            valor,
            TipoTransacao.SAQUE,
            "Saque",
            LocalDateTime.now()
        );

        transacao.setConta(conta);
        transacaoRepository.save(transacao);

        return conta;
    }



}

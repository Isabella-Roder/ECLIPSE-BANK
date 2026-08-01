const formEmprestimo = document.getElementById("form-emprestimo");
const mensagemEmprestimos = document.getElementById("mensagem-emprestimos");
const listaEmprestimos = document.getElementById("lista-emprestimos");

const creditoDisponivel = document.getElementById("credito-disponivel");
const quantidadeEmprestimos = document.getElementById("quantidade-emprestimos");
const totalSolicitadoEmprestimos = document.getElementById("total-solicitado-emprestimos");
const menorParcelaEmprestimos = document.getElementById("menor-parcela-emprestimos");
const statusEmprestimos = document.getElementById("status-emprestimos");

const tipoEmprestimo = document.getElementById("tipoEmprestimo");
const valorSolicitadoEmprestimo = document.getElementById("valorSolicitadoEmprestimo");
const quantidadeParcelasEmprestimo = document.getElementById("quantidadeParcelasEmprestimo");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;

function converterValor(valor) {
    return Number(valor.replace(/\./g, "").replace(",", ".").trim()) || 0;
}

function formatarStatusEmprestimo(status) {
    const textos = {
        SIMULADO: "Simulado",
        CONTRATADO: "Contratado",
        QUITADO: "Quitado",
        CANCELADO: "Cancelado",
        APROVADO: "Aprovado"
    };

    return textos[status] || status || "-";
}

function montarSeloStatus(status) {
    return `<span class="selo-emprestimo status-${(status || "").toLowerCase()}">${formatarStatusEmprestimo(status)}</span>`;
}

function montarBotaoAcao(emprestimo) {
    if (emprestimo.status === "SIMULADO") {
        return `<button class="botao-tabela" type="button" onclick="contratarEmprestimo(${emprestimo.id})">Contratar</button>`;
    }

    if (emprestimo.status === "CONTRATADO") {
        return `<button class="botao-tabela" type="button" onclick="pagarParcela(${emprestimo.id})">Pagar parcela</button>`;
    }

    return `<span class="texto-vazio">Sem acao</span>`;
}

async function lerMensagemErro(resposta, mensagemPadrao) {
    try {
        const texto = await resposta.text();

        if (!texto) {
            return mensagemPadrao;
        }

        const dados = JSON.parse(texto);
        return dados.message || dados.error || mensagemPadrao;
    } catch (erro) {
        return mensagemPadrao;
    }
}

async function carregarContas() {
    contaAtual = await buscarContaDoUsuario(usuarioLogado.id);
}

async function carregarEmprestimos() {
    try {
        await carregarContas();

        creditoDisponivel.textContent = formatarMoeda(contaAtual.saldo);

        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/emprestimos`)

        if (!resposta.ok) {
            mensagemEmprestimos.textContent = "Nao foi possivel carregar os emprestimos.";
            return;
        }

        const emprestimos = await resposta.json();
        
        renderizarEmprestimos(emprestimos);
        mensagemEmprestimos.textContent = "Simulacoes carregadas com sucesso.";
    } catch (erro) {
        console.error(erro);
        mensagemEmprestimos.textContent = "Erro ao conectar com o servidor.";
    }
}

function renderizarEmprestimos(emprestimos) {
    listaEmprestimos.innerHTML = "";

    if (!emprestimos || emprestimos.length === 0) {
        listaEmprestimos.innerHTML = `
            <tr>
                <td colspan="11">Nenhuma simulacao feita ainda.</td>
            </tr>
        `;

        atualizarResumo([]);
        return;
    }

    emprestimos.forEach((emprestimo) => {
        listaEmprestimos.innerHTML += `
            <tr>
                <td>${formatarDataHora(emprestimo.dataSolicitacao)}</td>
                <td>${emprestimo.tipo}</td>
                <td>${formatarMoeda(emprestimo.valorSolicitado)}</td>
                <td>${((emprestimo.taxaJurosMensal || 0) * 100).toFixed(2)}%</td>
                <td>${emprestimo.quantidadeParcelas}</td>
                <td>${emprestimo.parcelasPagas || 0}</td>
                <td>${formatarMoeda(emprestimo.valorParcela)}</td>
                <td>${formatarMoeda(emprestimo.saldoDevedor || 0)}</td>
                <td>${formatarMoeda(emprestimo.valorTotal)}</td>
                <td>${montarSeloStatus(emprestimo.status)}</td>
                <td>${montarBotaoAcao(emprestimo)}</td>   
            </tr>
        `;
    });

    atualizarResumo(emprestimos);
}

function atualizarResumo(emprestimos) {
    quantidadeEmprestimos.textContent = emprestimos.length;

    if (!emprestimos || emprestimos.length === 0) {
        totalSolicitadoEmprestimos.textContent = formatarMoeda(0);
        menorParcelaEmprestimos.textContent = formatarMoeda(0);
        statusEmprestimos.textContent = "-";
        return;
    }

    const emprestimosAtivos = emprestimos.filter((emprestimo) => emprestimo.status === "CONTRATADO");

    const totalContratadoAtivo = emprestimosAtivos.reduce((total, emprestimo) => {
        return total + (emprestimo.valorSolicitado || 0);
    }, 0);

    const parcelas = emprestimosAtivos.map((emprestimo) => emprestimo.valorParcela || 0).filter((valor) => valor > 0);

    const menorParcela = parcelas.length > 0 ? Math.min(...parcelas) : 0;

    const saldoDevedor = emprestimosAtivos.reduce((total, emprestimo) => {
        return total + (emprestimo.saldoDevedor || 0);
    }, 0);

    totalSolicitadoEmprestimos.textContent = formatarMoeda(totalContratadoAtivo);
    menorParcelaEmprestimos.textContent = formatarMoeda(menorParcela);
    statusEmprestimos.textContent = formatarMoeda(saldoDevedor);
}

formEmprestimo.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    if (!contaAtual) {
        await carregarContas();
    }

    const tipo = tipoEmprestimo.value;
    const valorSolicitado = converterValor(valorSolicitadoEmprestimo.value);
    const quantidadeParcelas = Number(quantidadeParcelasEmprestimo.value);

    if (!tipo || valorSolicitado <= 0 || quantidadeParcelas <= 0) {
        mensagemEmprestimos.textContent = "Preencha tipo, valor e parcelas corretamente.";
        return;
    }

    const emprestimo = {
        tipo: tipo,
        valorSolicitado: valorSolicitado,
        quantidadeParcelas: quantidadeParcelas
    };

    try {
        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/emprestimos/simular`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emprestimo)
        });

        if (!resposta.ok) {
            mensagemEmprestimos.textContent = await lerMensagemErro(
                resposta,
                "Nao foi possivel simular o emprestimo."
            );
            return;
        }

        formEmprestimo.reset();
        await carregarEmprestimos();
        mensagemEmprestimos.textContent = "Emprestimo simulado realizado com sucesso.";
    } catch (erro) {
        console.error(erro);
        mensagemEmprestimos.textContent = "Erro ao simular emprestimo.";
    }
});

async function contratarEmprestimo(id) {
    try {
        const resposta = await fetch(`${API_URL}/emprestimos/${id}/contratar`, {
            method: "POST"
        });

        if (!resposta.ok) {
            mensagemEmprestimos.textContent = await lerMensagemErro(
                resposta,
                "Nao foi possivel contratar esse emprestimo."
            );
            return
        }

        await carregarEmprestimos();

        mensagemEmprestimos.textContent = "Emprestimo contratado com sucesso.";
    } catch (erro) {
        console.error(erro);
        mensagemEmprestimos.textContent = "Erro ao contratar esse emprestimo.";
    }
}

async function pagarParcela(id) {
    try {
        const resposta = await fetch(`${API_URL}/emprestimos/${id}/pagar-parcela`, {
            method: "POST"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao pagar parcela.");
        }

        mensagemEmprestimos.textContent = "Parcela paga com sucesso.";
        await carregarEmprestimos();
    } catch (erro) {
        console.error(erro);
        mensagemEmprestimos.textContent = "Erro ao pagar a parcela.";
    }
}

if (!deveRedirecionar) {
    carregarEmprestimos();
}

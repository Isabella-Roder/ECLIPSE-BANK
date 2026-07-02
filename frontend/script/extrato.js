const API_URL = "http://localhost:8080";

const mensagemExtrato = document.getElementById("mensagem-extrato");
const tabelaExtrato = document.getElementById("tabela-extrato");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html";
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

async function carregarContaUsuario() {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/conta`);

    if (!resposta.ok) {
        mensagemExtrato.textContent = "Conta não encontrada para esse usuario.";
        return;
    }

    const conta = await resposta.json();

    carregarExtrato(conta.id);
}

async function carregarExtrato(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/transacoes`);

    if (!resposta.ok) {
        mensagemExtrato.textContent = "Erro ao buscar extrato.";
        return;
    }

    const extratos = await resposta.json();

    tabelaExtrato.innerHTML = "";

    if (extratos.length === 0) {
        mensagemExtrato.textContent = "Essa conta ainda não tem extrato.";
        return;
    }

    mensagemExtrato.textContent = "";

    extratos.forEach((extrato) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${extrato.data}</td>
            <td>${extrato.descricao}</td>
            <td>${extrato.categoria}</td>
            <td>${extrato.tipo}</td>
            <td>${formatarMoeda(extrato.valor)}</td>
        `;
        tabelaExtrato.appendChild(linha);
    });
}

carregarContaUsuario();
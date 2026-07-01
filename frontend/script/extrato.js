const API_URL = "http://localhost:8080";

const contaId = document.getElementById("contaId");
const formExtrato = document.getElementById("form-extrato");
const mensagemExtrato = document.getElementById("mensagem-extrato");
const tabelaExtrato = document.getElementById("tabela-extrato");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

async function carregarExtrato() {
    const resposta = await fetch(`${API_URL}/contas/${contaId.value}/transacoes`);

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

formExtrato.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    await carregarExtrato();
});
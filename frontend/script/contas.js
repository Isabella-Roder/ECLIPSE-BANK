const API_URL = "http://localhost:8080";

const formConta = document.getElementById("form-conta");
const mensagemConta = document.getElementById("mensagem-conta");
const tabelaContas = document.getElementById("tabela-contas");

const botaoDepositar = document.getElementById("botao-depositar");
const botaoSacar = document.getElementById("botao-sacar");
const mensagemOperacao = document.getElementById("mensagem-operacao");

async function carregarConta() {
    const resposta = await fetch(`${API_URL}/contas`);
    const contas = await resposta.json();

    tabelaContas.innerHTML = "";

    contas.forEach((conta) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${conta.id}</td>
            <td>${conta.titular}</td>
            <td>${conta.numero}</td>
            <td>${conta.chavePix}</td>
            <td>R$ ${conta.saldo || 0}</td>
            <td>R$ ${conta.limite || 0}</td>
            <td>${conta.usuario ? conta.usuario.nome : "-"}</td>
        `;

        tabelaContas.appendChild(linha);
    })
}

formConta.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const usuarioId = document.getElementById("usuarioId").value;

    const conta = {
        titular: document.getElementById("titular").value,
        numero: Number(document.getElementById("numero").value),
        chavePix: document.getElementById("chavePix").value,
        limite: Number(document.getElementById("limite").value)
    };

    const resposta = await fetch(`${API_URL}/contas/usuario/${usuarioId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(conta)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemConta.textContent = erro.erro;
        return;
    }

    mensagemConta.textContent = "Conta criada com sucesso.";
    formConta.reset();
    await carregarConta();
});

botaoDepositar.addEventListener("click", async () => {
    const contaId = document.getElementById("contaIdOperacao").value;
    const valor = document.getElementById("valorOperacao").value;

    const resposta = await fetch(`${API_URL}/contas/${contaId}/depositar?valor=${valor}`, {
        method: "POST"
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemOperacao.textContent = erro.erro;
        return;
    }

    mensagemOperacao.textContent = "Deposito realizado com sucesso.";
    await carregarConta();
});

botaoSacar.addEventListener("click", async () => {
    const contaId = document.getElementById("contaIdOperacao").value;
    const valor = document.getElementById("valorOperacao").value;

    const resposta = await fetch(`${API_URL}/contas/${contaId}/sacar?valor=${valor}`, {
        method: "POST"
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemOperacao.textContent = erro.erro;
        return;
    }

    mensagemOperacao.textContent = "Saque realizado com sucesso.";
    await carregarConta();
});

carregarConta();
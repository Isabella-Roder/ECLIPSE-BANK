const API_URL = "http://localhost:8080";

const formMinhaConta = document.getElementById("form-minha-conta");
const mensagemMinhaConta = document.getElementById("mensagem-minha-conta");

const titularConta = document.getElementById("titular-conta");
const saldoConta = document.getElementById("saldo-conta");
const limiteConta = document.getElementById("limite-conta");
const numeroConta = document.getElementById("numero-conta");
const chavePix = document.getElementById("chave-pix");
const usuarioConta = document.getElementById("usuario-conta");
const emailConta = document.getElementById("email-conta");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

async function carregarMinhaConta(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}`);

    if (!resposta.ok) {
        mensagemMinhaConta.textContent = "Erro essa conta não existe.";
        return;
    }

    const minhaConta = await resposta.json();

    mensagemMinhaConta.textContent = "";

    if (minhaConta.length === 0) {
        mensagemMinhaConta.textContent = "Essa conta esta vazia.";
        return;
    }

    titularConta.textContent = minhaConta.titular;
    saldoConta.textContent = formatarMoeda(minhaConta.saldo || 0);
    limiteConta.textContent = formatarMoeda(minhaConta.limite || 0);
    numeroConta.textContent = minhaConta.numero;
    chavePix.textContent = minhaConta.chavePix;
    usuarioConta.textContent = minhaConta.usuario ? minhaConta.usuario.nome : "-";
    emailConta.textContent = minhaConta.usuario ? minhaConta.usuario.email : "-";

    mensagemMinhaConta.textContent = "Conta carregada com sucesso.";
}

formMinhaConta.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const contaId = document.getElementById("contaId").value;
    await carregarMinhaConta(contaId);
});
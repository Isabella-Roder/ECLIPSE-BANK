const API_URL = "http://localhost:8080";

const mensagemMinhaConta = document.getElementById("mensagem-minha-conta");

const titularConta = document.getElementById("titular-conta");
const saldoConta = document.getElementById("saldo-conta");
const limiteConta = document.getElementById("limite-conta");
const numeroConta = document.getElementById("numero-conta");
const chavePix = document.getElementById("chave-pix");
const tipoChavePix = document.getElementById("tipo-chave-pix");
const usuarioConta = document.getElementById("usuario-conta");
const emailConta = document.getElementById("email-conta");

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

async function carregarMinhaConta(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}/conta`);

    if (!resposta.ok) {
        mensagemMinhaConta.textContent = "Erro essa conta não existe.";
        return;
    }

    const minhaConta = await resposta.json();

    mensagemMinhaConta.textContent = "Conta carregada com sucesso.";

    titularConta.textContent = minhaConta.titular;
    saldoConta.textContent = formatarMoeda(minhaConta.saldo || 0);
    limiteConta.textContent = formatarMoeda(minhaConta.limite || 0);
    numeroConta.textContent = minhaConta.numero;
    chavePix.textContent = minhaConta.chavePix;
    tipoChavePix.textContent = minhaConta.tipoChavePix || "-";
    usuarioConta.textContent = minhaConta.usuario ? minhaConta.usuario.nome : "-";
    emailConta.textContent = minhaConta.usuario ? minhaConta.usuario.email : "-";

}

carregarMinhaConta(usuarioLogado.id);

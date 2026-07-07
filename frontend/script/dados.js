const API_URL = "http://localhost:8080";

const mensagensDados = document.getElementById("mensagem-dados");

const nome = document.getElementById("nome-usuario");
const nomeCompleto = document.getElementById("nome-completo");
const nomeSocial = document.getElementById("nome-social");
const cpf = document.getElementById("cpf-usuario");
const telefone = document.getElementById("telefone-usuario");
const dataNascimento = document.getElementById("data-nascimento");
const email = document.getElementById("email-usuario");
const idUsuario = document.getElementById("id-usuario");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html";
}

function formatarData(data) {
    if (!data) {
        return "-";
    }

    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

async function carregarDados(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}`);

    if (!resposta.ok) {
        mensagensDados.textContent = "Usuario não encontrado.";
        return;
    }

    const dados = await resposta.json();
    mensagensDados.textContent = "Dados carregados com sucesso.";

    nome.textContent = dados.nomeSocial || dados.nome;
    nomeCompleto.textContent = dados.nome;
    nomeSocial.textContent = dados.nomeSocial || "-";
    cpf.textContent = dados.cpf;
    dataNascimento.textContent = formatarData(dados.dataNascimento);
    email.textContent = dados.email || "-";
    telefone.textContent = dados.telefone || "-";
    idUsuario.textContent = dados.id;

}

carregarDados(usuarioLogado.id);

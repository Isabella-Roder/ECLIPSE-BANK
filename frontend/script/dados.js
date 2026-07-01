const API_URL = "http://localhost:8080";

const formDados = document.getElementById("form-dados");
const mensagensDados = document.getElementById("mensagem-dados");

const nome = document.getElementById("nome-usuario");
const nomeSocial = document.getElementById("nome-social");
const cpf = document.getElementById("cpf-usuario");
const dataNascimento = document.getElementById("data-nascimento");
const email = document.getElementById("email-usuario");
const idUsuario = document.getElementById("id-usuario");

async function carregarDados(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}`);

    if (!resposta.ok) {
        mensagensDados.textContent = "Usuario não encontrado.";
        return;
    }

    const dados = await resposta.json();
    mensagensDados.textContent = "";

    nome.textContent = dados.nome;
    nomeSocial.textContent = dados.nomeSocial || "-";
    cpf.textContent = dados.cpf;
    dataNascimento.textContent = dados.dataNascimento || "";
    email.textContent = dados.email || "-";
    idUsuario.textContent = dados.id;

    mensagensDados.textContent = "Usuario encontrado.";
}

formDados.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const usuarioId = document.getElementById("usuarioId").value;
    await carregarDados(usuarioId);
});
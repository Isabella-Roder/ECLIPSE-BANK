const API_URL = "http://localhost:8080";

const formUsuario = document.getElementById("form-usuario");
const tabelaUsuarios = document.getElementById("tabela-usuarios");
const mensagemUsuario = document.getElementById("mensagem-usuario");

async function carregarUsuarios() {
    const resposta = await fetch(`${API_URL}/usuarios`);
    const usuarios = await resposta.json();

    tabelaUsuarios.innerHTML = "";

    usuarios.forEach((usuario) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.nomeSocial || "-"}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.email}</td>
            <td>${usuario.dataNascimento}</td>
        `;

        tabelaUsuarios.appendChild(linha);
    });
}

formUsuario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const usuario = {
        nome: document.getElementById("nome").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        dataNascimento: document.getElementById("dataNascimento").value
    };

    const resposta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemUsuario.textContent = erro.erro;
        return;
    }

    mensagemUsuario.textContent = "Usuário cadastrado com sucesso.";
    formUsuario.reset();

    await carregarUsuarios();
});

carregarUsuarios();
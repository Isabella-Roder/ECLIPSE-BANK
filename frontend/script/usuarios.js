const API_URL = "http://localhost:8080";

const formUsuario = document.getElementById("form-usuario");
const tabelaUsuarios = document.getElementById("tabela-usuarios");
const mensagemUsuario = document.getElementById("mensagem-usuario");
const inputCpf = document.getElementById("cpf");
const inputTelefone = document.getElementById("telefone");

function mascararCpf(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return valor;
}

function mascararTelefone(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    return valor;
}

inputCpf.addEventListener("input", () => {
    inputCpf.value = mascararCpf(inputCpf.value);
});

inputTelefone.addEventListener("input", () => {
    inputTelefone.value = mascararTelefone(inputTelefone.value);
});

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
            <td>${usuario.telefone}</td>
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
        telefone: document.getElementById("telefone").value,
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

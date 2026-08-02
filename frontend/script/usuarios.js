const API_URL = "http://localhost:8080";

const formUsuario = document.getElementById("form-usuario");
const tabelaUsuarios = document.getElementById("tabela-usuarios");
const mensagemUsuario = document.getElementById("mensagem-usuario");
const inputCpf = document.getElementById("cpf");
const inputTelefone = document.getElementById("telefone");

const inputUsuarioId = document.getElementById("usuarioId");
const botaoSalvarUsuario = document.getElementById("botao-salvar-usuario");
const botaoCancelarEdicaoUsuario = document.getElementById("botao-cancelar-edicao-usuario");

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
            <td>${usuario.ativo === false ? "Desativado" : "Ativo"}</td>
            <td>
                <button type="button" onclick='prepararEdicaoUsuario(${JSON.stringify(usuario)})'>
                    Editar
                </button>

                <button type="button" onclick="alterarStatusUsuario(${usuario.id})">
                    ${usuario.ativo === false ? "Reativar" : "Desativar"}
                </button>
            </td>
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

    const usuarioId = inputUsuarioId.value;

    const url = usuarioId
        ? `${API_URL}/usuarios/${usuarioId}`
        : `${API_URL}/usuarios`;

    const metodo = usuarioId ? "PUT" : "POST";

    const resposta = await fetch(url, {
        method: metodo,
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

    mensagemUsuario.textContent = usuarioId
        ? "Usuario atualizado com sucesso."
        : "Usuario cadastrado com sucesso.";

    limparFormularioUsuario();
    await carregarUsuarios();
});

function prepararEdicaoUsuario(usuario) {
    inputUsuarioId.value = usuario.id;
    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("nomeSocial").value = usuario.nomeSocial || "";
    document.getElementById("cpf").value = usuario.cpf || "";
    document.getElementById("telefone").value = usuario.telefone || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("senha").value = usuario.senha || "";
    document.getElementById("dataNascimento").value = usuario.dataNascimento || "";

    botaoSalvarUsuario.textContent = "Salvar alteracoes";
}

async function alterarStatusUsuario(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}/status`, {
        method: "PUT"
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemUsuario.textContent = erro.erro || "Erro ao alterar status do usuario.";
        return;
    }

    mensagemUsuario.textContent = "Status do usuario alterado com sucesso.";
    await carregarUsuarios();
}

function limparFormularioUsuario() {
    formUsuario.reset();
    inputUsuarioId.value = "";
    botaoSalvarUsuario.textContent = "Cadastrar usuario";
}

botaoCancelarEdicaoUsuario.addEventListener("click", () => {
    limparFormularioUsuario();
    mensagemUsuario.textContent = "";
});

carregarUsuarios();

const API_URL = "http://localhost:8080";

const formLogin = document.getElementById("form-login");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const inputConfirmarSenha = document.getElementById("cadastroConfirmarSenha");
const botaoMostrarSenhas = document.getElementById("mostrar-senhas");
const mensagemLogin = document.getElementById("mensagem-login");

if (localStorage.getItem("usuarioLogado")) {
    window.location.href = "index.html";
}

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    mensagemLogin.textContent = "Entrando...";

    const login = {
        email: emailInput.value.trim(),
        senha: senhaInput.value
    };

    if (!login.email || !login.senha) {
        mensagemLogin.textContent = "Preencha email e senha.";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemLogin.textContent = erro.erro || "Email ou senha invalidos.";
            return;
        }

        const usuario = await resposta.json();

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "index.html";
    } catch (erro) {
        mensagemLogin.textContent = "Nao foi possivel conectar ao servidor.";
    }
})

const authCard = document.getElementById("auth-card");
const authTitulo = document.querySelector(".auth-header h1");
const authDescricao = document.querySelector(".auth-header p:not(.eyebrow)");
const botaoMostrarCadastro = document.getElementById("mostrar-cadastro");
const botaoMostrarLogin = document.getElementById("mostrar-login");
const formAberturaConta = document.getElementById("form-abertura-conta");
const inputCadastroCpf = document.getElementById("cadastroCpf");
const inputCadastroTelefone = document.getElementById("cadastroTelefone");
const inputCadastroLimite = document.getElementById("cadastroLimite");

function mostrarCadastro() {
    authCard.classList.add("modo-cadastro");
    authTitulo.textContent = "Abrir conta";
    authDescricao.textContent = "Preencha seus dados para criar seu acesso e sua conta.";
    mensagemLogin.textContent = "";
}

function mostrarLogin() {
    authCard.classList.remove("modo-cadastro");
    authTitulo.textContent = "Entrar na conta";
    authDescricao.textContent = "Informe seus dados para acessar o Eclipse Bank.";
    mensagemLogin.textContent = "";
}

botaoMostrarCadastro.addEventListener("click", mostrarCadastro);

botaoMostrarLogin.addEventListener("click", mostrarLogin);

function converterDinheiroParaNumero(valor) {
    valor = valor.replace(/\D/g, "");
    return Number(valor) / 100;
}

function mascararDinheiro(valor) {
    valor = valor.replace(/\D/g, "");

    const numero = Number(valor) / 100;

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

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

inputCadastroCpf.addEventListener("input", () => {
    inputCadastroCpf.value = mascararCpf(inputCadastroCpf.value);
});

inputCadastroTelefone.addEventListener("input", () => {
    inputCadastroTelefone.value = mascararTelefone(inputCadastroTelefone.value);
});

inputCadastroLimite.addEventListener("input", () => {
    inputCadastroLimite.value = mascararDinheiro(inputCadastroLimite.value);
});

formAberturaConta.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (document.getElementById("cadastroSenha").value !== inputConfirmarSenha.value) {
        mensagemLogin.textContent = "As senhas não podem ser diferentes";
        return;
    }

    const usuario = {
        nome: document.getElementById("cadastroNome").value,
        nomeSocial: document.getElementById("cadastroNomeSocial").value,
        cpf: document.getElementById("cadastroCpf").value,
        telefone: document.getElementById("cadastroTelefone").value,
        email: document.getElementById("cadastroEmail").value,
        senha: document.getElementById("cadastroSenha").value,
        dataNascimento: document.getElementById("cadastroDataNascimento").value
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
        mensagemLogin.textContent = erro.erro;
        return;
    }

    const usuarioConta = await resposta.json();

    const tipoChavePix = document.getElementById("cadastroTipoChavePix").value;

    let chavePix = "";

    if (tipoChavePix === "EMAIL") {
        chavePix = usuario.email;
    } else if (tipoChavePix === "CPF") {
        chavePix = usuario.cpf;
    } else if (tipoChavePix === "TELEFONE") {
        chavePix = usuario.telefone;
    } else if (tipoChavePix === "ALEATORIA") {
        chavePix = crypto.randomUUID();
    }

    const conta = {
        titular: usuario.nomeSocial || usuario.nome,
        chavePix: chavePix,
        tipoChavePix: tipoChavePix,
        limite: converterDinheiroParaNumero(document.getElementById("cadastroLimite").value)
    };

    const respostaConta = await fetch(`${API_URL}/contas/usuario/${usuarioConta.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(conta)
    });

    if (!respostaConta.ok) {
        const erro = await respostaConta.json();
        mensagemLogin.textContent = erro.erro;
        return;
    }

    const contaCriada = await respostaConta.json();

    formAberturaConta.reset();
    mostrarLogin();

    emailInput.value = usuario.email;
    senhaInput.value = "";

    mensagemLogin.textContent = `Conta criada com sucesso. Numero da conta: ${contaCriada.numero}. Agora faça login.`;
});

botaoMostrarSenhas.addEventListener("click", () => {
    const inputSenha = document.getElementById("cadastroSenha");

    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        inputConfirmarSenha.type = "text";
        botaoMostrarSenhas.textContent = "Ocultar senhas";
    } else {
        inputSenha.type = "password";
        inputConfirmarSenha.type = "password";
        botaoMostrarSenhas.textContent = "Mostrar senhas";
    }
});

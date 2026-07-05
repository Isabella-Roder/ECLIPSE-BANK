const API_URL = "http://localhost:8080";

const formLogin = document.getElementById("form-login");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
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
const botaoMostrarCadastro = document.getElementById("mostrar-cadastro");
const botaoMostrarLogin = document.getElementById("mostrar-login");
const formAberturaConta = document.getElementById("form-abertura-conta");
const inputCadastroCpf = document.getElementById("cadastroCpf");
const inputCadastroTelefone = document.getElementById("cadastroTelefone");
const inputCadastroLimite = document.getElementById("cadastroLimite");

botaoMostrarCadastro.addEventListener("click", () => {
    authCard.classList.add("modo-cadastro");
});

botaoMostrarLogin.addEventListener("click", () => {
    authCard.classList.remove("modo-cadastro");
});

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
    }

    const conta = {
        titular: usuario.nomeSocial || usuario.nome,
        numero: Math.floor(100000 + Math.random() * 900000),
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

    mensagemLogin.textContent = "Conta criada com sucesso. Agora faça login.";
    formAberturaConta.reset();
    authCard.classList.remove("modo-cadastro");
});

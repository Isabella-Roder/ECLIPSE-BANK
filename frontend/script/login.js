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

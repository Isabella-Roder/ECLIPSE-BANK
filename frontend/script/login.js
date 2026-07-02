const API_URL = "http://localhost:8080";

const formLogin = document.getElementById("form-login");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const mensagemLogin = document.getElementById("mensagem-login");

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = {
        email: emailInput.value,
        senha: senhaInput.value
    };

    const resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemLogin.textContent = erro.erro;
        return;
    }

    const usuario = await resposta.json();

    if (usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "index.html";
        return;
    }
})
const API_URL = "http://localhost:8080";

function formatarMoeda(valor) {
    return (valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function pegarUsuarioLogado() {
    return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function pegarEmpresaLogada() {
    return JSON.parse(localStorage.getItem("empresaLogada"));
}

function redirecionarParaLoginSeNaoExistir(dadosLogados) {
    if (!dadosLogados) {
        window.location.href = "login.html";
        return true;
    }

    return false;
}

async function buscarContaDaEmpresa(empresaId) {
    const resposta = await fetch(`${API_URL}/empresas/${empresaId}/conta`);

    if (!resposta.ok) {
        throw new Error("Conta empresarial nao encontrada.");
    }

    return await resposta.json();
}

async function buscarContaDoUsuario(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}/conta`);

    if (!resposta.ok) {
        throw new Error("Conta do usuario nao encontrada.");
    }

    return await resposta.json();
}

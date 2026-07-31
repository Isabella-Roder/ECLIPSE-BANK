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
    const sessao = JSON.parse(localStorage.getItem("sessao"));

    if (sessao && sessao.tipo === "USUARIO") {
        return {
            id: sessao.id,
            nome: sessao.nome,
            nomeSocial: sessao.nome,
            email: sessao.email,
            tipo: sessao.tipo
        };
    }

    return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function pegarEmpresaLogada() {
    const sessao = JSON.parse(localStorage.getItem("sessao"));

    if (sessao && sessao.tipo === "EMPRESA") {
        return {
            id: sessao.id,
            nomeFantasia: sessao.nome,
            razaoSocial: sessao.nome,
            email: sessao.email,
            tipo: sessao.tipo
        };
    }

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

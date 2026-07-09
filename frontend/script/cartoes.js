const API_URL = "http://localhost:8080";

const numeroCartao = document.getElementById("numero-cartao");
const nomeImpressoCartao = document.getElementById("nome-impresso-cartao");
const limiteTotalCartao = document.getElementById("limite-total-cartao");
const limiteDisponivelCartao = document.getElementById("limite-disponivel-cartao");
const statusCartao = document.getElementById("status-cartao");
const mensagemCartao = document.getElementById("mensagem-cartao");

const formCartao = document.getElementById("form-cartao");

const formCompraCartao = document.getElementById("form-compra-cartao");
const listaComprasCartao = document.getElementById("lista-compras-cartao");
const inputValorCompra = document.getElementById("valorCompra");

const areaCriarCartao = document.getElementById("area-criar-cartao");
const areaComprasCartao = document.getElementById("area-compras-cartao");

const listaCompraCartao = document.getElementById("lista-compras-cartao");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html"
}

let contaAtual = null;
let cartaoAtual = null;

function formatarMoeda(valor) {
    return (valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mascararDinheiro(valor) {
    valor = valor.replace(/\D/g, "");

    const numero = Number(valor) / 100;

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function converterDinheiroParaNumero(valor) {
    valor = valor.replace(/\D/g, "");
    return Number(valor) / 100;
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

async function carregarConta(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}/conta`);

    if (!resposta.ok) {
        mensagemCartao.textContent = "Conta ainda não carregou";
        return;
    }

    contaAtual = await resposta.json();
    carregarCartao(contaAtual.id);
}

async function carregarCartao(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/cartao`);

    if (!resposta.ok) {
        mensagemCartao.textContent = "Você ainda não tem cartão. Crie um abaixo";
        areaCriarCartao.style.display = "block";
        areaComprasCartao.style.display = "none";
        return;
    }

    cartaoAtual = await resposta.json();

    numeroCartao.textContent = cartaoAtual.numero;
    nomeImpressoCartao.textContent = cartaoAtual.nomeImpresso;
    limiteTotalCartao.textContent = formatarMoeda(cartaoAtual.limiteTotal);
    limiteDisponivelCartao.textContent = formatarMoeda(cartaoAtual.limiteDisponivel);
    statusCartao.textContent = cartaoAtual.status;

    mensagemCartao.textContent = "Cartão ativo Eclipse Bank";

    areaCriarCartao.style.display = "none";
    areaComprasCartao.style.display = "block";

    carregarComprasCartao(cartaoAtual.id);
}

async function carregarComprasCartao(cartaoId) {
    const resposta = await fetch(`${API_URL}/cartoes/${cartaoId}/compras`);

    if (!resposta.ok) {
        listaComprasCartao.innerHTML = `
            <tr>
                <td colspan="5">Não foi possivel carregar as compras.</td>
            </tr>
        `;
        return;
    }

    const compras = await resposta.json();

    if (compras.length === 0) {
        listaComprasCartao.innerHTML = `
            <tr>
                <td colspan="5">Nenhuma compra registrada ainda.</td>
            </tr>
        `;
        return;
    }

    listaComprasCartao.innerHTML = "";

    compras.slice().reverse().forEach((compra) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(compra.dataHora)}</td>
            <td>${compra.descricao}</td>
            <td>${compra.categoria}</td>
            <td><span class="selo-status">${compra.status}</span></td>
            <td class="valor-saida">${formatarMoeda(compra.valor)}</td>
        `;

        listaCompraCartao.appendChild(linha);
    });
}

formCartao.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaAtual) {
        mensagemCartao.textContent = "Conta ainda não carregou";
        return
    }

    const cartao = {
        nomeImpresso: document.getElementById("nomeImpresso").value,
        limiteTotal: converterDinheiroParaNumero(document.getElementById("limiteTotal").value),
        dataValidade: document.getElementById("dataValidade").value
    };

    const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/cartao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartao)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemCartao.textContent = erro.erro || "Erro ao criar cartão.";
        return;
    }

    mensagemCartao.textContent = "Cartão criado com sucesso.";
    formCartao.reset();
    carregarCartao(contaAtual.id);
});

inputValorCompra.addEventListener("input", () => {
    inputValorCompra.value = mascararDinheiro(inputValorCompra.value);
})

formCompraCartao.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!cartaoAtual) {
        mensagemCartao.textContent = "Cartão ainda não carregou.";
        return;
    }

    const compra = {
        descricao: document.getElementById("descricaoCompra").value,
        categoria: document.getElementById("categoriaCompra").value,
        valor: converterDinheiroParaNumero(document.getElementById("valorCompra").value)
    }

    const resposta = await fetch(`${API_URL}/cartoes/${cartaoAtual.id}/compras`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(compra)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemCartao.textContent = erro.erro || "Erro ao registrar a compra.";
        return;
    }

    mensagemCartao.textContent = "Compra registrada com sucesso.";
    formCompraCartao.reset();
    carregarCartao(contaAtual.id);
});

carregarConta(usuarioLogado.id);
const numeroCartaoEmpresa = document.getElementById("numero-cartao-empresa");
const mensagemCartaoEmpresa = document.getElementById("mensagem-cartao-empresa");

const numeroCartaoVisualEmpresa = document.getElementById("numero-cartao-visual-empresa");
const nomeCartaoVisualEmpresa = document.getElementById("nome-cartao-visual-empresa");
const validadeCartaoVisualEmpresa = document.getElementById("validade-cartao-visual-empresa");

const nomeImpressoCartaoEmpresa = document.getElementById("nome-impresso-cartao-empresa");
const limiteTotalCartaoEmpresa = document.getElementById("limite-total-cartao-empresa");
const limiteDisponivelCartaoEmpresa = document.getElementById("limite-disponivel-cartao-empresa");
const statusCartaoEmpresa = document.getElementById("status-cartao-empresa");

const totalFaturaCartaoEmpresa = document.getElementById("total-fatura-cartao-empresa");
const quantidadeComprasCartaoEmpresa = document.getElementById("quantidade-compras-cartao-empresa");
const limiteUsadoCartaoEmpresa = document.getElementById("limite-usado-cartao-empresa");
const percentualLimiteCartaoEmpresa = document.getElementById("percentual-limite-cartao-empresa");

const formCartaoEmpresa = document.getElementById("form-cartao-empresa");
const formCompraCartaoEmpresa = document.getElementById("form-compra-cartao-empresa");
const areaCriarCartaoEmpresa = document.getElementById("area-criar-cartao-empresa");
const areaComprasCartaoEmpresa = document.getElementById("area-compras-cartao-empresa");
const listaComprasCartaoEmpresa = document.getElementById("lista-compras-cartao-empresa");
const inputValorCompraCartaoEmpresa = document.getElementById("valorCompraCartaoEmpresa");
const inputLimiteTotalCartaoEmpresa = document.getElementById("limiteTotalCartaoEmpresa");

const empresaLogada = pegarEmpresaLogada();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(empresaLogada);

let contaEmpresaAtual = null;
let cartaoEmpresaAtual = null;

function mascararDinheiro(valor) {
    const somenteNumeros = valor.replace(/\D/g, "");
    const numero = Number(somenteNumeros) / 100;

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function converterDinheiroParaNumero(valor) {
    const somenteNumeros = valor.replace(/\D/g, "");
    return Number(somenteNumeros) / 100;
}

function mascararNumeroCartao(numero) {
    if (!numero) {
        return "**** **** **** ****";
    }

    const final = String(numero).slice(-4);
    return `**** **** **** ${final}`;
}

function formatarValidade(dataValidade) {
    if (!dataValidade) {
        return "--/--";
    }

    const partes = dataValidade.split("-");
    const ano = partes[0].slice(-2);
    const mes = partes[1];

    return `${mes}/${ano}`;
}

function atualizarResumoFatura(compras) {
    const totalFatura = compras.reduce((soma, compra) => soma + (compra.valor || 0), 0);
    const limiteTotal = cartaoEmpresaAtual ? cartaoEmpresaAtual.limiteTotal || 0 : 0;
    const percentualUso = limiteTotal > 0 ? (totalFatura / limiteTotal) * 100 : 0;

    totalFaturaCartaoEmpresa.textContent = formatarMoeda(totalFatura);
    quantidadeComprasCartaoEmpresa.textContent = compras.length;
    limiteUsadoCartaoEmpresa.textContent = formatarMoeda(totalFatura);
    percentualLimiteCartaoEmpresa.textContent = `${percentualUso.toFixed(1)}%`;
}

async function carregarContaEmpresa() {
    try {
        contaEmpresaAtual = await buscarContaDaEmpresa(empresaLogada.id);
        await carregarCartao(contaEmpresaAtual.id);
    } catch (erro) {
        mensagemCartaoEmpresa.textContent = "Conta empresarial ainda nao carregou.";
    }
}

async function carregarCartao(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/cartao`);

    if (!resposta.ok) {
        mensagemCartaoEmpresa.textContent = "Essa conta PJ ainda nao tem cartao. Crie um abaixo.";
        areaCriarCartaoEmpresa.style.display = "block";
        areaComprasCartaoEmpresa.style.display = "none";
        return;
    }

    cartaoEmpresaAtual = await resposta.json();

    numeroCartaoEmpresa.textContent = cartaoEmpresaAtual.numero;
    nomeImpressoCartaoEmpresa.textContent = cartaoEmpresaAtual.nomeImpresso;
    limiteTotalCartaoEmpresa.textContent = formatarMoeda(cartaoEmpresaAtual.limiteTotal);
    limiteDisponivelCartaoEmpresa.textContent = formatarMoeda(cartaoEmpresaAtual.limiteDisponivel);
    statusCartaoEmpresa.textContent = cartaoEmpresaAtual.status;
    numeroCartaoVisualEmpresa.textContent = mascararNumeroCartao(cartaoEmpresaAtual.numero);
    nomeCartaoVisualEmpresa.textContent = cartaoEmpresaAtual.nomeImpresso || "EMPRESA";
    validadeCartaoVisualEmpresa.textContent = formatarValidade(cartaoEmpresaAtual.dataValidade);

    mensagemCartaoEmpresa.textContent = "Cartao empresarial ativo Eclipse Bank";

    areaCriarCartaoEmpresa.style.display = "none";
    areaComprasCartaoEmpresa.style.display = "block";

    await carregarComprasCartao(cartaoEmpresaAtual.id);
}

async function carregarComprasCartao(cartaoId) {
    const resposta = await fetch(`${API_URL}/cartoes/${cartaoId}/compras`);

    if (!resposta.ok) {
        listaComprasCartaoEmpresa.innerHTML = `
            <tr>
                <td colspan="5">Nao foi possivel carregar as compras.</td>
            </tr>
        `;
        return;
    }

    const compras = await resposta.json();
    atualizarResumoFatura(compras);

    if (compras.length === 0) {
        listaComprasCartaoEmpresa.innerHTML = `
            <tr>
                <td colspan="5">Nenhuma compra registrada ainda.</td>
            </tr>
        `;
        return;
    }

    listaComprasCartaoEmpresa.innerHTML = "";

    compras.slice().reverse().forEach((compra) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(compra.dataHora)}</td>
            <td>${compra.descricao}</td>
            <td>${compra.categoria}</td>
            <td><span class="selo-status">${compra.status}</span></td>
            <td class="valor-saida">${formatarMoeda(compra.valor)}</td>
        `;

        listaComprasCartaoEmpresa.appendChild(linha);
    });
}

formCartaoEmpresa.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaEmpresaAtual) {
        mensagemCartaoEmpresa.textContent = "Conta empresarial ainda nao carregou.";
        return;
    }

    const cartao = {
        nomeImpresso: document.getElementById("nomeImpressoCartaoEmpresa").value,
        limiteTotal: converterDinheiroParaNumero(document.getElementById("limiteTotalCartaoEmpresa").value),
        dataValidade: document.getElementById("dataValidadeCartaoEmpresa").value
    };

    const resposta = await fetch(`${API_URL}/contas/${contaEmpresaAtual.id}/cartao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartao)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemCartaoEmpresa.textContent = erro.erro || "Erro ao criar cartao empresarial.";
        return;
    }

    mensagemCartaoEmpresa.textContent = "Cartao empresarial criado com sucesso.";
    formCartaoEmpresa.reset();
    await carregarCartao(contaEmpresaAtual.id);
});

formCompraCartaoEmpresa.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!cartaoEmpresaAtual) {
        mensagemCartaoEmpresa.textContent = "Cartao empresarial ainda nao carregou.";
        return;
    }

    const compra = {
        descricao: document.getElementById("descricaoCompraCartaoEmpresa").value,
        categoria: document.getElementById("categoriaCompraCartaoEmpresa").value,
        valor: converterDinheiroParaNumero(document.getElementById("valorCompraCartaoEmpresa").value)
    };

    const resposta = await fetch(`${API_URL}/cartoes/${cartaoEmpresaAtual.id}/compras`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(compra)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemCartaoEmpresa.textContent = erro.erro || "Erro ao registrar compra empresarial.";
        return;
    }

    mensagemCartaoEmpresa.textContent = "Compra empresarial registrada com sucesso.";
    formCompraCartaoEmpresa.reset();
    await carregarCartao(contaEmpresaAtual.id);
});

inputValorCompraCartaoEmpresa.addEventListener("input", () => {
    inputValorCompraCartaoEmpresa.value = mascararDinheiro(inputValorCompraCartaoEmpresa.value);
});

inputLimiteTotalCartaoEmpresa.addEventListener("input", () => {
    inputLimiteTotalCartaoEmpresa.value = mascararDinheiro(inputLimiteTotalCartaoEmpresa.value);
});

if (!deveRedirecionar) {
    carregarContaEmpresa();
}

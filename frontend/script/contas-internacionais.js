const formContaInternacional = document.getElementById("form-conta-internacional");
const moedaContaInternacional = document.getElementById("moeda-conta-internacional");
const listaContasInternacionais= document.getElementById("lista-contas-internacionais");
const mensagemContaInternacional = document.getElementById("mensagem-conta-internacional");

const formComprarMoeda = document.getElementById("form-comprar-moeda");
const moedaCompra = document.getElementById("moeda-compra");
const valorCompraMoeda = document.getElementById("valor-compra-moeda");

const formVenderMoeda = document.getElementById("form-vender-moeda");
const moedaVenda = document.getElementById("moeda-venda");
const valorVendaMoeda = document.getElementById("valor-venda-moeda");

const saldoInternacionalTotal = document.getElementById("saldo-internacional-total");
const quantidadeContasInternacionais = document.getElementById("quantidade-contas-internacionais");
const saldoContaNacionalCambio = document.getElementById("saldo-conta-nacional-cambio");
const saldoUsd = document.getElementById("saldo-usd");
const saldoEur = document.getElementById("saldo-eur");
const saldoGbp = document.getElementById("saldo-gbp");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

function formatarMoedaInternacional(valor, moeda) {
    const moedas = {
        USD: "USD",
        EUR: "EUR",
        GBP: "GBP"
    };

    return (valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: moedas[moeda] || "BRL"
    });
}

function converterValor(valor) {
    return Number(valor.replace(/\./g, "").replace(",", ".").trim()) || 0;
}

async function lerMensagemErro(resposta, menssagemPadrao) {
    try {
        const texto = await resposta.text();

        if (!texto) {
            return menssagemPadrao;
        }

        const dados = JSON.parse(texto);
        return dados.message || dados.error || menssagemPadrao;
    } catch (erro) {
        return menssagemPadrao;
    }
}

async function carregarContasInternacionais() {
    try {
        await carregarSaldoContaNacional();

        const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/contas-internacionais`);

        if (!resposta.ok) {
            mensagemContaInternacional.textContent = "Nao foi possivel carregar contas internacionais.";
            return;
        }

        const contas = await resposta.json();

        renderizarContasInternacionais(contas);
        mensagemContaInternacional.textContent = "Contas internacionais carregadas com sucesso.";
    } catch (erro) {
        console.error(erro);
        mensagemContaInternacional.textContent = "Erro ao conectar com o servidor.";
    }
}

async function carregarSaldoContaNacional() {
    try {
        const conta = await buscarContaDoUsuario(usuarioLogado.id);
        const saldoFormatado = formatarMoeda(conta.saldo);

        saldoContaNacionalCambio.textContent = saldoFormatado;

        const saldoTopo = document.querySelector(".resumo-conta-saldo");

        if (saldoTopo) {
            saldoTopo.textContent = saldoFormatado;
        }
    } catch (erro) {
        saldoContaNacionalCambio.textContent = "R$ 0,00";
    }
}

function renderizarContasInternacionais(contas) {
    listaContasInternacionais.innerHTML = "";

    if (!contas || contas.length === 0) {
        listaContasInternacionais.innerHTML = `
            <tr>
                <td colspan="4">Nenhuma conta internacional aberta ainda.</td>
            </tr>
        `;
        atualizarResumo([]);
        return;
    }

    contas.forEach((conta) => {
        listaContasInternacionais.innerHTML += `
            <tr>
                <td>${conta.numero || "-"}</td>
                <td>${conta.moeda || "-"}</td>
                <td>${formatarMoedaInternacional(conta.saldo, conta.moeda)}</td>
                <td>${conta.status || "-"}</td>
            </tr>
        `;
    });

    atualizarResumo(contas);
}

function atualizarResumo(contas) {
    const totalPorMoeda = {
        USD: 0,
        EUR: 0,
        GBP: 0
    };

    contas.forEach((conta) => {
        if (totalPorMoeda[conta.moeda] !== undefined) {
            totalPorMoeda[conta.moeda] += conta.saldo || 0;
        }
    });

    quantidadeContasInternacionais.textContent = contas.length;
    saldoUsd.textContent = formatarMoedaInternacional(totalPorMoeda.USD, "USD");
    saldoEur.textContent = formatarMoedaInternacional(totalPorMoeda.EUR, "EUR");
    saldoGbp.textContent = formatarMoedaInternacional(totalPorMoeda.GBP, "GBP");

    saldoInternacionalTotal.textContent = `${contas.length} conta(s) ativa(s)`;
}

formContaInternacional.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const moeda = moedaContaInternacional.value;

    if (!moeda) {
        mensagemContaInternacional.textContent = "Selecione uma moeda.";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/contas-internacionais?moeda=${moeda}`, {
            method: "POST"
        });

        if (!resposta.ok) {
            mensagemContaInternacional.textContent = await lerMensagemErro(
                resposta,
                "Nao foi possivel abrir a conta internacional."
            );
            return;
        }

        formContaInternacional.reset();
        await carregarContasInternacionais();
        mensagemContaInternacional.textContent = "Conta internacional aberta com sucesso.";
    } catch (erro) {
        mensagemContaInternacional.textContent = "Erro ao abrir conta internacional.";
    }
});

formComprarMoeda.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const moeda = moedaCompra.value;
    const valor = converterValor(valorCompraMoeda.value);

    if (!moeda || valor <= 0) {
        mensagemContaInternacional.textContent = "Selecione a moeda e informe um valor valido para compra.";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/contas-internacionais/comprar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                moeda: moeda,
                valor: valor
            }),
        });

        if (!resposta.ok) {
            mensagemContaInternacional.textContent = await lerMensagemErro(
                resposta,
                "Nao foi possivel comprar moeda."
            );
            return;
        }

        formComprarMoeda.reset();
        await carregarContasInternacionais();
        mensagemContaInternacional.textContent = "Moeda comprada com sucesso.";
    } catch (erro) {
        console.error(erro);
        mensagemContaInternacional.textContent = "Erro ao comprar moeda."
    }
});

formVenderMoeda.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const moeda = moedaVenda.value;
    const valor = converterValor(valorVendaMoeda.value);

    if (!moeda || valor <= 0) {
        mensagemContaInternacional.textContent = "Selecione a moeda e informe um valor valido para venda.";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/contas-internacionais/vender`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                moeda: moeda,
                valor: valor
            })
        });

        if (!resposta.ok) {
            mensagemContaInternacional.textContent = await lerMensagemErro(
                resposta,
                "Nao foi possivel vender moeda."
            );
            return;
        }

        formVenderMoeda.reset();
        await carregarContasInternacionais();
        mensagemContaInternacional.textContent = "Moeda vendida com sucesso.";
    } catch (erro) {
        mensagemContaInternacional.textContent = "Erro ao vender moeda.";
    }
});

if (!deveRedirecionar) {
    carregarContasInternacionais();
}

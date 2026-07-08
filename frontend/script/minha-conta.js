const API_URL = "http://localhost:8080";

const mensagemMinhaConta = document.getElementById("mensagem-minha-conta");
const saudacaoCliente = document.getElementById("saudacao-cliente");

const titularConta = document.getElementById("titular-conta");
const saldoConta = document.getElementById("saldo-conta");
const limiteConta = document.getElementById("limite-conta");
const numeroConta = document.getElementById("numero-conta");
const chavePix = document.getElementById("chave-pix");
const tipoChavePix = document.getElementById("tipo-chave-pix");
const usuarioConta = document.getElementById("usuario-conta");
const emailConta = document.getElementById("email-conta");
const ultimasTransacoes = document.getElementById("ultimas-transacoes");
const ultimosComprovantes = document.getElementById("ultimos-comprovantes");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html";
}

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

function ehEntrada(tipo) {
    return tipo === "RECEITA" || tipo === "DEPOSITO";
}

function nomeCliente() {
    return usuarioLogado.nomeSocial || usuarioLogado.nome || "cliente";
}

async function carregarMinhaConta(usuarioId) {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}/conta`);

    if (!resposta.ok) {
        mensagemMinhaConta.textContent = "Erro essa conta não existe.";
        return;
    }

    const minhaConta = await resposta.json();

    saudacaoCliente.textContent = `Ola, ${nomeCliente()}`;
    mensagemMinhaConta.textContent = "Conta pessoal Eclipse Bank";

    titularConta.textContent = minhaConta.titular;
    saldoConta.textContent = formatarMoeda(minhaConta.saldo || 0);
    limiteConta.textContent = formatarMoeda(minhaConta.limite || 0);
    numeroConta.textContent = minhaConta.numero;
    chavePix.textContent = minhaConta.chavePix;
    tipoChavePix.textContent = minhaConta.tipoChavePix || "-";
    usuarioConta.textContent = minhaConta.usuario ? minhaConta.usuario.nome : "-";
    emailConta.textContent = minhaConta.usuario ? minhaConta.usuario.email : "-";

    carregarUltimasTransacoes(minhaConta.id);
    carregarUltimosComprovantes(minhaConta.id);
}

async function carregarUltimasTransacoes(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/transacoes`);

    if (!resposta.ok) {
        ultimasTransacoes.innerHTML = `<p class="texto-vazio">Nao foi possivel carregar as movimentacoes.</p>`;
        return;
    }

    const transacoes = await resposta.json();
    const recentes = transacoes.slice(-5).reverse();

    if (recentes.length === 0) {
        ultimasTransacoes.innerHTML = `<p class="texto-vazio">Nenhuma movimentacao registrada ainda.</p>`;
        return;
    }

    ultimasTransacoes.innerHTML = "";

    recentes.forEach((transacao) => {
        const item = document.createElement("div");
        item.className = "item-resumo";

        item.innerHTML = `
            <div>
                <strong>${transacao.descricao || transacao.tipo}</strong>
                <span>${transacao.categoria || "-"} | ${formatarDataHora(transacao.dataHora)}</span>
            </div>
            <strong class="${ehEntrada(transacao.tipo) ? "valor-entrada" : "valor-saida"}">${formatarMoeda(transacao.valor)}</strong>
        `;

        ultimasTransacoes.appendChild(item);
    });
}

async function carregarUltimosComprovantes(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/comprovantes`);

    if (!resposta.ok) {
        ultimosComprovantes.innerHTML = `<p class="texto-vazio">Nao foi possivel carregar os comprovantes.</p>`;
        return;
    }

    const comprovantes = await resposta.json();
    const recentes = comprovantes.slice(-4).reverse();

    if (recentes.length === 0) {
        ultimosComprovantes.innerHTML = `<p class="texto-vazio">Nenhum comprovante salvo ainda.</p>`;
        return;
    }

    ultimosComprovantes.innerHTML = "";

    recentes.forEach((comprovante) => {
        const item = document.createElement("a");
        item.className = "item-resumo item-resumo-link";
        item.href = `comprovante.html?id=${comprovante.id}`;

        item.innerHTML = `
            <div>
                <strong>${comprovante.metodo}</strong>
                <span>${comprovante.destino || "-"} | ${formatarDataHora(comprovante.dataHora)}</span>
            </div>
            <strong>${formatarMoeda(comprovante.valor)}</strong>
        `;

        ultimosComprovantes.appendChild(item);
    });
}

carregarMinhaConta(usuarioLogado.id);

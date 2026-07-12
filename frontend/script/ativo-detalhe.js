const ativoSelecionado = JSON.parse(localStorage.getItem("ativoMercadoSelecionado"));
const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;

function carregarAtivo() {
    if (!ativoSelecionado) {
        document.getElementById("mensagem-ativo-detalhe").textContent = "Escolha um ativo antes de simular.";
        document.getElementById("form-ativo-detalhe").style.display = "none";
        return;
    }

    document.getElementById("ativo-detalhe-nome").textContent = ativoSelecionado.nome;
    document.getElementById("ativo-detalhe-ticker").textContent = ativoSelecionado.ticker;
    document.getElementById("ativo-detalhe-preco").textContent = formatarMoeda(ativoSelecionado.precoAtual);
    document.getElementById("ativo-detalhe-variacao").textContent = `${ativoSelecionado.variacaoDia}%`;
    document.getElementById("ativo-detalhe-tipo").textContent = ativoSelecionado.tipo;
    document.getElementById("preco-ativo-simulacao").value = formatarMoeda(ativoSelecionado.precoAtual);
}

async function carregarConta() {
    contaAtual = await buscarContaDoUsuario(usuarioLogado.id);
    document.getElementById("saldo-ativo-detalhe").textContent = formatarMoeda(contaAtual.saldo);
    simularCompra();
}

function simularCompra() {
    if (!ativoSelecionado || !contaAtual) {
        return;
    }

    const quantidade = Number(document.getElementById("quantidade-ativo").value);
    const total = quantidade * ativoSelecionado.precoAtual;
    const saldoDepois = contaAtual.saldo - total;

    document.getElementById("quantidade-resumo").textContent = quantidade;
    document.getElementById("valor-total-ativo").textContent = formatarMoeda(total);
    document.getElementById("saldo-apos-compra").textContent = formatarMoeda(saldoDepois);
}

document.getElementById("quantidade-ativo").addEventListener("input", simularCompra);

if (!deveRedirecionar) {
    carregarAtivo();
    carregarConta();
}

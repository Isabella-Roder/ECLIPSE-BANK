const form = document.getElementById("form-buscar-ativo");
const inputTicker = document.getElementById("ticker");
const mensagem = document.getElementById("mensagem-mercado");
const resultadoAtivo = document.getElementById("resultado-ativo");

//const usuarioLogado = pegarUsuarioLogado();
//const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

//let contaAtual = null;
let ativoAtual = null;

form.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    try {
        const ticker = inputTicker.value.trim().toUpperCase();

        if (!ticker) {
            mensagem.textContent = "Digite um ticker para buscar.";
            return;
        }

        const resposta = await fetch(`${API_URL}/mercado/ativos/${ticker}`);

        if (!resposta.ok) {
            mensagem.textContent = "Ativo não encontrado.";
            return;
        }

        const ativo = await resposta.json();
        ativoAtual = ativo;

        document.getElementById("ativo-preco").textContent = formatarMoeda(ativo.precoAtual);
        document.getElementById("ativo-variacao").textContent = `${ativo.variacaoDia}%`;
        document.getElementById("ativo-dividend-yield").textContent = `${ativo.dividendYield}%`;
        document.getElementById("ativo-tipo").textContent = ativo.tipo;

        resultadoAtivo.innerHTML = `
            <div class="mercado-ativo-marca">
                <span>${ativo.ticker}</span>
                <strong>${ativo.nome}</strong>
            </div>
            <p>${ativo.tipo} negociado no mercado B3.</p>
            <div class="mercado-tags">
                <span>${ativo.tipo}</span>
                <span>${ativo.ticker}</span>
            </div>
            <div class="mercado-ativo-acoes">
                <button type="button" id="botao-investir-ativo" class="botao-investir-ativo">
                    Investir nesse ativo
                </button>
            </div>
        `;

        document.getElementById("botao-investir-ativo").addEventListener("click", selecionarAtivoParaInvestir);
        mensagem.textContent = "Ativo encontrado.";
    } catch (erro) {
        mensagem.textContent = "Ativo não encontrado.";
    }

    
});

function selecionarAtivoParaInvestir() {
    if (!ativoAtual) {
        mensagem.textContent = "Busque um ativo antes de investir.";
        return;
    }

    localStorage.setItem("ativoMercadoSelecionado", JSON.stringify(ativoAtual));
    mensagem.textContent = `${ativoAtual.ticker} selecionado para uma futura simulacao de compra.`;
    window.location.href = "ativo-detalhe.html";
}

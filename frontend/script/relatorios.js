const mensagemRelatorios = document.getElementById("mensagem-relatorios");
const relatorioResultado = document.getElementById("relatorio-resultado");
const relatorioEntradas = document.getElementById("relatorio-entradas");
const relatorioSaidas = document.getElementById("relatorio-saidas");
const relatorioSaldoAtual = document.getElementById("relatorio-saldo-atual");
const relatorioTotalMetas = document.getElementById("relatorio-total-metas");
const relatorioMaiorMovimentacao = document.getElementById("relatorio-maior-movimentacao");
const relatorioCategoriaPrincipal = document.getElementById("relatorio-categoria-principal");
const relatorioTotalTransacoes = document.getElementById("relatorio-total-transacoes");
const relatorioMetasAtivas = document.getElementById("relatorio-metas-ativas");
const relatorioInsight = document.getElementById("relatorio-insight");

const formFiltrosRelatorio = document.getElementById("form-filtros-relatorio");
const relatorioDataInicio = document.getElementById("relatorio-data-inicio");
const relatorioDataFim = document.getElementById("relatorio-data-fim");
const relatorioFiltroTipo = document.getElementById("relatorio-filtro-tipo");
const limparFiltrosRelatorio = document.getElementById("limpar-filtros-relatorio");

const listaResumoCategorias = document.getElementById("lista-resumo-categorias");
const listaRelatorioTransacoes = document.getElementById("lista-relatorio-transacoes");
const graficoFluxoRelatorio = document.getElementById("grafico-fluxo-relatorio");
const graficoCategoriasRelatorio = document.getElementById("grafico-categorias-relatorio");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;
let transacoesAtuais = [];
let metasAtuais = [];

async function carregarRelatorios() {
    try {
        contaAtual = await buscarContaDoUsuario(usuarioLogado.id);

        const respostaTransacoes = await fetch(`${API_URL}/contas/${contaAtual.id}/transacoes`);
        const respostaMetas = await fetch(`${API_URL}/contas/${contaAtual.id}/metas`);

        if (!respostaTransacoes.ok || !respostaMetas.ok) {
            mensagemRelatorios.textContent = "Não foi possivel carregar os relatorios";
            return;
        }

        transacoesAtuais = await respostaTransacoes.json();
        metasAtuais = await respostaMetas.json();

        preencherFiltrosTipos(transacoesAtuais);
        calcularResumo(transacoesAtuais, metasAtuais);
        mensagemRelatorios.textContent = "Relatorio carregado.";
    } catch (erro) {
        mensagemRelatorios.textContent = "Erro ao conectar com o servidor.";
    }
}

function ehEntrada(tipo) {
    return tipo === "RECEITA"
        || tipo === "DEPOSITO"
        || tipo === "VENDA_ATIVO"
        || tipo === "RESGATE_INVESTIMENTO"
        || tipo === "RESGATE_META";
}

function calcularResumo(transacoes, metas) {
    const entradas = transacoes
        .filter((transacao) => ehEntrada(transacao.tipo))
        .reduce((soma, transacao) => soma + (transacao.valor || 0), 0);

    const saidas = transacoes.filter((transacao) => !ehEntrada(transacao.tipo)).reduce((soma, transacao) => soma + (transacao.valor || 0), 0);

    const resultado = entradas - saidas;

    const totalMetas = metas.reduce((soma, meta) => {
        return soma + (meta.valorAtual || 0);
    }, 0);

    const metasAtivas = metas.filter((meta) => meta.status === "EM_ANDAMENTO").length;

    const maiorMovimentacao = transacoes.reduce((maior, transacao) => {
        return (transacao.valor || 0) > maior ? transacao.valor : maior;
    }, 0);

    relatorioEntradas.textContent = formatarMoeda(entradas);
    relatorioSaidas.textContent = formatarMoeda(saidas);
    relatorioResultado.textContent = formatarMoeda(resultado);
    relatorioSaldoAtual.textContent = formatarMoeda(contaAtual.saldo);
    relatorioTotalMetas.textContent = formatarMoeda(totalMetas);
    relatorioMetasAtivas.textContent = metasAtivas;
    relatorioMaiorMovimentacao.textContent = formatarMoeda(maiorMovimentacao);
    relatorioTotalTransacoes.textContent = transacoes.length;

    renderizarResumoCategorias(transacoes);
    renderizarUltimasTransacoes(transacoes);
    renderizarInsight(entradas, saidas, totalMetas);
    renderizarGraficosRelatorio(transacoes, entradas, saidas);
}

function renderizarResumoCategorias(transacoes) {
    listaResumoCategorias.innerHTML = "";

    if (transacoes.length === 0) {
        listaResumoCategorias.innerHTML = `
            <tr>
                <td colspan="4">Nenhuma categoria encontrada.</td>
            </tr>
        `;
        relatorioCategoriaPrincipal.textContent = "-";
        return;
    }

    const categorias = {};

    transacoes.forEach((transacao) => {
        const categoria = transacao.categoria || "Sem categoria";

        if (!categorias[categoria]) {
            categorias[categoria] = {
                quantidade: 0,
                total: 0,
                entradas: 0,
                saidas: 0
            };
        }

        categorias[categoria].quantidade++;
        categorias[categoria].total += transacao.valor || 0;

        if (ehEntrada(transacao.tipo)) {
            categorias[categoria].entradas += transacao.valor || 0;
        } else {
            categorias[categoria].saidas += transacao.valor || 0;
        }
    });

    const categoriasOrdenadas = Object.entries(categorias).sort((a, b) => {
        return b[1].total - a[1].total;
    });

    relatorioCategoriaPrincipal.textContent = categoriasOrdenadas[0][0];

    categoriasOrdenadas.forEach(([categoria, dados]) => {
        const tipoDominante = dados.entradas >= dados.saidas ? "Entrada" : "Saida";

        listaResumoCategorias.innerHTML += `
            <tr>
                <td>${categoria}</td>
                <td>${dados.quantidade}</td>
                <td>${formatarMoeda(dados.total)}</td>
                <td>${tipoDominante}</td>
            </tr>
        `;
    });
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function renderizarUltimasTransacoes(transacoes) {
    listaRelatorioTransacoes.innerHTML = "";

    if (transacoes.length === 0) {
        listaRelatorioTransacoes.innerHTML = `
            <tr>
                <td colspan="5">Nenhuma movimentacao encontrada.</td>
            </tr>
        `;
        return;
    }

    const ultimas = [...transacoes].sort((a, b) => {
        return new Date(b.dataHora) - new Date(a.dataHora);
    }).slice(0, 8);

    ultimas.forEach((transacao) => {
        const classeValor = ehEntrada(transacao.tipo) ? "valor-entrada" : "valor-saida";

        listaRelatorioTransacoes.innerHTML += `
            <tr>
                <td>${formatarDataHora(transacao.dataHora)}</td>
                <td>${transacao.descricao || "-"}</td>
                <td>${transacao.categoria || "-"}</td>
                <td><span class="selo-tipo">${transacao.tipo}</span></td>
                <td class="${classeValor}">${formatarMoeda(transacao.valor)}</td>
            </tr>
        `;
    });
}

function renderizarInsight(entradas, saidas, totalMetas) {
    const resultado = entradas - saidas;

    if (entradas === 0 && saidas === 0) {
        relatorioInsight.textContent = "Ainda nao existem movimentacoes suficientes para gerar uma leitura financeira.";
        return;
    }

    if (resultado >= 0) {
        relatorioInsight.textContent = `As entradas superam as saidas em ${formatarMoeda(resultado)}. O total guardado em metas e ${formatarMoeda(totalMetas)}.`;
    } else {
        relatorioInsight.textContent = `As saidas superam as entradas em ${formatarMoeda(Math.abs(resultado))}. Vale revisar as categorias com maior gasto.`;
    }
}

function prepararCanvas(canvas) {
    const contexto = canvas.getContext("2d");
    const proporcao = window.devicePixelRatio || 1;
    const largura = canvas.clientWidth || canvas.parentElement.clientWidth;
    const altura = Number(canvas.getAttribute("height")) || 220;

    canvas.width = largura * proporcao;
    canvas.height = altura * proporcao;
    contexto.setTransform(proporcao, 0, 0, proporcao, 0, 0);
    contexto.clearRect(0, 0, largura, altura);

    return { contexto, largura, altura };
}

function desenharTextoVazio(contexto, largura, altura, texto) {
    contexto.fillStyle = "rgba(247, 243, 234, 0.62)";
    contexto.font = "14px Arial";
    contexto.textAlign = "center";
    contexto.fillText(texto, largura / 2, altura / 2);
}

function desenharGraficoFluxo(entradas, saidas) {
    const { contexto, largura, altura } = prepararCanvas(graficoFluxoRelatorio);
    const maiorValor = Math.max(entradas, saidas);

    if (maiorValor === 0) {
        desenharTextoVazio(contexto, largura, altura, "Sem dados para exibir");
        return;
    }

    const margem = 28;
    const areaAltura = altura - 72;
    const larguraBarra = Math.min(90, (largura - margem * 3) / 2);
    const barras = [
        { label: "Entradas", valor: entradas, cor: "#75e48a" },
        { label: "Saidas", valor: saidas, cor: "#ff6b86" }
    ];

    barras.forEach((barra, indice) => {
        const x = margem + indice * (larguraBarra + margem);
        const alturaBarra = (barra.valor / maiorValor) * areaAltura;
        const y = altura - 42 - alturaBarra;

        contexto.fillStyle = "rgba(255, 255, 255, 0.055)";
        contexto.fillRect(x, margem, larguraBarra, areaAltura);

        contexto.fillStyle = barra.cor;
        contexto.fillRect(x, y, larguraBarra, alturaBarra);

        contexto.fillStyle = "#f7f3ea";
        contexto.font = "700 13px Arial";
        contexto.textAlign = "center";
        contexto.fillText(barra.label, x + larguraBarra / 2, altura - 20);

        contexto.fillStyle = "rgba(247, 243, 234, 0.72)";
        contexto.font = "12px Arial";
        contexto.fillText(formatarMoeda(barra.valor), x + larguraBarra / 2, y - 8);
    });
}

function obterCategoriasParaGrafico(transacoes) {
    const categorias = {};

    transacoes.forEach((transacao) => {
        const categoria = transacao.categoria || "Sem categoria";
        categorias[categoria] = (categorias[categoria] || 0) + (transacao.valor || 0);
    });

    return Object.entries(categorias)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([nome, valor]) => ({ nome, valor }));
}

function desenharGraficoCategorias(transacoes) {
    const { contexto, largura, altura } = prepararCanvas(graficoCategoriasRelatorio);
    const categorias = obterCategoriasParaGrafico(transacoes);
    const total = categorias.reduce((soma, categoria) => soma + categoria.valor, 0);

    if (total === 0) {
        desenharTextoVazio(contexto, largura, altura, "Sem categorias para exibir");
        return;
    }

    const cores = ["#f7c778", "#a855f7", "#75e48a", "#ff6b86", "#6ed6ff"];
    const centroX = Math.min(largura * 0.34, 140);
    const centroY = altura / 2;
    const raio = Math.min(72, largura * 0.22);
    let anguloInicial = -Math.PI / 2;

    categorias.forEach((categoria, indice) => {
        const fatia = (categoria.valor / total) * Math.PI * 2;

        contexto.beginPath();
        contexto.moveTo(centroX, centroY);
        contexto.arc(centroX, centroY, raio, anguloInicial, anguloInicial + fatia);
        contexto.closePath();
        contexto.fillStyle = cores[indice % cores.length];
        contexto.fill();

        anguloInicial += fatia;
    });

    categorias.forEach((categoria, indice) => {
        const x = largura * 0.58;
        const y = 42 + indice * 30;

        contexto.fillStyle = cores[indice % cores.length];
        contexto.fillRect(x, y - 10, 12, 12);

        contexto.fillStyle = "#f7f3ea";
        contexto.font = "700 12px Arial";
        contexto.textAlign = "left";
        contexto.fillText(categoria.nome, x + 20, y);

        contexto.fillStyle = "rgba(247, 243, 234, 0.68)";
        contexto.font = "12px Arial";
        contexto.fillText(formatarMoeda(categoria.valor), x + 20, y + 15);
    });
}

function renderizarGraficosRelatorio(transacoes, entradas, saidas) {
    desenharGraficoFluxo(entradas, saidas);
    desenharGraficoCategorias(transacoes);
}

function preencherFiltrosTipos(transacoes) {
    const tipos = [...new Set(transacoes.map((transacao) => transacao.tipo).filter(Boolean))];

    relatorioFiltroTipo.innerHTML = `<option value="">Todos os tipos</option>`;

    tipos.forEach((tipo) => {
        relatorioFiltroTipo.innerHTML += `<option value="${tipo}">${tipo}</option>`;
    });
}

function filtrarTransacoesRelatorio() {
    const inicio = relatorioDataInicio.value;
    const fim = relatorioDataFim.value;
    const tipo = relatorioFiltroTipo.value;

    const filtradas = transacoesAtuais.filter((transacao) => {
        const data = transacao.dataHora ? transacao.dataHora.split("T")[0] : "";

        const passaInicio = !inicio || data >= inicio;
        const passaFim = !fim || data <= fim;
        const passaTipo = !tipo || transacao.tipo === tipo;

        return passaInicio && passaFim && passaTipo;
    });

    calcularResumo(filtradas, metasAtuais);
    mensagemRelatorios.textContent = `${filtradas.length} movimentacao(oes) no filtro.`;
}

formFiltrosRelatorio.addEventListener("submit", function (evento) {
    evento.preventDefault();
    filtrarTransacoesRelatorio();
});

limparFiltrosRelatorio.addEventListener("click", function () {
    relatorioDataInicio.value = "";
    relatorioDataFim.value = "";
    relatorioFiltroTipo.value = "";

    calcularResumo(transacoesAtuais, metasAtuais);
    mensagemRelatorios.textContent = "Filtros limpos.";
});

if (!deveRedirecionar) {
    carregarRelatorios();
}

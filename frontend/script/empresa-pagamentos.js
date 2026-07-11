const formPagamentoEmpresa = document.getElementById("form-pagamento-empresa");
const selectMetodoPagamentoEmpresa = document.getElementById("metodo-pagamento-empresa");
const inputDestinoPagamentoEmpresa = document.getElementById("destino-pagamento-empresa");
const ajudaDestinoPagamentoEmpresa = document.getElementById("ajuda-destino-pagamento-empresa");
const inputValorPagamentoEmpresa = document.getElementById("valor-pagamento-empresa");
const mensagemPagamentoEmpresa = document.getElementById("mensagem-pagamento-empresa");
const saldoPagamentoEmpresa = document.getElementById("saldo-pagamento-empresa");
const empresaPagadora = document.getElementById("empresa-pagadora");
const numeroContaPagamentoEmpresa = document.getElementById("numero-conta-pagamento-empresa");
const pixPagamentoEmpresa = document.getElementById("pix-pagamento-empresa");
const listaPagamentosEmpresa = document.getElementById("lista-pagamentos-empresa");

const empresaLogada = pegarEmpresaLogada();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(empresaLogada);

let contaEmpresa = null;

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

function formatarMetodo(metodo) {
    if (metodo === "PIX") {
        return "Pix";
    }

    if (metodo === "BOLETO") {
        return "Boleto";
    }

    return "Transferencia";
}

function atualizarCampoDestinoEmpresa() {
    const metodo = selectMetodoPagamentoEmpresa.value;

    if (metodo === "TRANSFERENCIA") {
        inputDestinoPagamentoEmpresa.placeholder = "Digite o numero da conta destino";
        ajudaDestinoPagamentoEmpresa.textContent = "Use apenas o numero da conta que vai receber.";
    } else if (metodo === "PIX") {
        inputDestinoPagamentoEmpresa.placeholder = "Email, CPF, telefone ou chave aleatoria";
        ajudaDestinoPagamentoEmpresa.textContent = "Digite a chave Pix cadastrada pela pessoa ou empresa.";
    } else if (metodo === "BOLETO") {
        inputDestinoPagamentoEmpresa.placeholder = "Digite o codigo do boleto";
        ajudaDestinoPagamentoEmpresa.textContent = "Informe o codigo ficticio do boleto para registrar o pagamento.";
    }

    inputDestinoPagamentoEmpresa.value = "";
}

function montarComprovanteEmpresa(pagamento) {
    return {
        valor: pagamento.valor,
        contaOrigem: contaEmpresa.numero,
        contaDestino: pagamento.destino,
        pagador: empresaLogada.nomeFantasia || empresaLogada.razaoSocial,
        tipoConta: "PJ",
        metodo:
            pagamento.metodo === "PIX" ? "Pix empresarial" :
            pagamento.metodo === "BOLETO" ? "Pagamento de boleto empresarial" :
            "Transferencia empresarial",
        dataHora: pagamento.dataHora,
        status: pagamento.status,
        codigoAutenticacao: pagamento.codigoAutenticacao
    };
}

function renderizarPagamentosEmpresa(pagamentos) {
    const pagamentosDaEmpresa = pagamentos.filter((pagamento) => {
        return pagamento.conta && pagamento.conta.id === contaEmpresa.id;
    });

    if (pagamentosDaEmpresa.length === 0) {
        listaPagamentosEmpresa.innerHTML = `<p class="texto-vazio">Nenhum pagamento empresarial encontrado.</p>`;
        return;
    }

    listaPagamentosEmpresa.innerHTML = "";

    pagamentosDaEmpresa.forEach((pagamento) => {
        const item = document.createElement("div");
        item.classList.add("item-pagamento");

        item.innerHTML = `
            <div class="pagamento-info">
                <strong>${formatarMetodo(pagamento.metodo)}</strong>
                <span>${pagamento.destino}</span>
            </div>

            <div class="pagamento-status">
                <span>${pagamento.status}</span>
            </div>

            <div class="pagamento-valor">
                <strong>${formatarMoeda(pagamento.valor)}</strong>
                <span>${formatarDataHora(pagamento.dataHora)}</span>
            </div>

            <button class="botao-comprovante" type="button">
                Ver comprovante
            </button>
        `;

        const botaoComprovante = item.querySelector(".botao-comprovante");

        botaoComprovante.addEventListener("click", () => {
            localStorage.setItem("ultimoComprovante", JSON.stringify(montarComprovanteEmpresa(pagamento)));
            window.location.href = "comprovante.html";
        });

        listaPagamentosEmpresa.appendChild(item);
    });
}

async function carregarPagamentosEmpresa() {
    const resposta = await fetch(`${API_URL}/pagamentos`);

    if (!resposta.ok) {
        listaPagamentosEmpresa.innerHTML = `<p class="texto-vazio">Erro ao carregar pagamentos empresariais.</p>`;
        return;
    }

    const pagamentos = await resposta.json();
    renderizarPagamentosEmpresa(pagamentos);
}

async function carregarContaEmpresa() {
    try {
        contaEmpresa = await buscarContaDaEmpresa(empresaLogada.id);

        saldoPagamentoEmpresa.textContent = formatarMoeda(contaEmpresa.saldo);
        mensagemPagamentoEmpresa.textContent = "Conta empresarial pronta para pagamentos.";
        empresaPagadora.textContent = empresaLogada.nomeFantasia || empresaLogada.razaoSocial || "-";
        numeroContaPagamentoEmpresa.textContent = contaEmpresa.numero || "-";
        pixPagamentoEmpresa.textContent = contaEmpresa.chavePix || "-";

        await carregarPagamentosEmpresa();
    } catch (erro) {
        mensagemPagamentoEmpresa.textContent = "Nao foi possivel carregar a conta empresarial.";
    }
}

formPagamentoEmpresa.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaEmpresa) {
        mensagemPagamentoEmpresa.textContent = "Conta empresarial ainda nao carregou.";
        return;
    }

    const pagamento = {
        contaOrigem: contaEmpresa.id,
        destino: inputDestinoPagamentoEmpresa.value,
        valor: converterDinheiroParaNumero(inputValorPagamentoEmpresa.value),
        metodo: selectMetodoPagamentoEmpresa.value
    };

    const resposta = await fetch(`${API_URL}/pagamentos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pagamento)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemPagamentoEmpresa.textContent = erro.erro || "Nao foi possivel fazer o pagamento.";
        return;
    }

    const pagamentoSalvo = await resposta.json();

    localStorage.setItem("ultimoComprovante", JSON.stringify(montarComprovanteEmpresa(pagamentoSalvo)));
    formPagamentoEmpresa.reset();
    atualizarCampoDestinoEmpresa();

    window.location.href = "comprovante.html";
});

inputValorPagamentoEmpresa.addEventListener("input", () => {
    inputValorPagamentoEmpresa.value = mascararDinheiro(inputValorPagamentoEmpresa.value);
});

selectMetodoPagamentoEmpresa.addEventListener("change", atualizarCampoDestinoEmpresa);

if (!deveRedirecionar) {
    atualizarCampoDestinoEmpresa();
    carregarContaEmpresa();
}

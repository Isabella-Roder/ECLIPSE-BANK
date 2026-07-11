const mensagemComprovantes = document.getElementById("mensagem-comprovantes");
const tabelaComprovantes = document.getElementById("tabela-comprovantes");

const usuarioLogado = pegarUsuarioLogado();
const empresaLogada = pegarEmpresaLogada();

if (!usuarioLogado && !empresaLogada) {
    window.location.href = "login.html";
}

function preencherCabecalhoComprovantes(conta) {
    const nome = empresaLogada
        ? empresaLogada.nomeFantasia || empresaLogada.razaoSocial
        : usuarioLogado.nomeSocial || usuarioLogado.nome;

    mensagemComprovantes.textContent = `Buscando comprovantes da conta ${conta.numero} - ${nome}.`;
}

async function carregarContaLogada() {
    try {
        const conta = empresaLogada
            ? await buscarContaDaEmpresa(empresaLogada.id)
            : await buscarContaDoUsuario(usuarioLogado.id);

        preencherCabecalhoComprovantes(conta);
        await carregarComprovantesDaConta(conta.id);
    } catch (erro) {
        mensagemComprovantes.textContent = "Conta nao encontrada para esse login.";
    }
}

async function carregarComprovantesDaConta(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/comprovantes`);

    if (!resposta.ok) {
        mensagemComprovantes.textContent = "Erro ao buscar os comprovantes.";
        return;
    }

    const comprovantes = await resposta.json();
    renderizarComprovantes(comprovantes);
}

function renderizarComprovantes(comprovantes) {
    tabelaComprovantes.innerHTML = "";

    if (comprovantes.length === 0) {
        mensagemComprovantes.textContent = "Essa conta ainda nao possui comprovantes.";
        return;
    }

    mensagemComprovantes.textContent = `${comprovantes.length} comprovante(s) encontrado(s).`;

    comprovantes.forEach((comprovante) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(comprovante.dataHora)}</td>
            <td><span class="selo-tipo">${comprovante.metodo || "-"}</span></td>
            <td>${comprovante.destino || "-"}</td>
            <td>${comprovante.status || "-"}</td>
            <td>${formatarMoeda(comprovante.valor)}</td>
            <td>
                <a class="botao-secundario" href="comprovante.html?id=${comprovante.id}">
                    Ver
                </a>
            </td>
        `;

        tabelaComprovantes.appendChild(linha);
    });
}

carregarContaLogada();

const formMeta = document.getElementById("form-meta");
const listaMeta = document.getElementById("lista-metas");
const mensagemMeta = document.getElementById("mensagem-metas");
const totalMetasGuardado = document.getElementById("total-metas-guardado");
const totalMetasAlvo = document.getElementById("total-metas-alvo");
const progressoMetas = document.getElementById("progresso-metas-geral");
const quantidadeMetasAtivas = document.getElementById("quantidade-metas-ativas");
const quantidadeMetasConcluidas = document.getElementById("quantidade-metas-concluidas");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;

async function carregarConta() {
    contaAtual = await buscarContaDoUsuario(usuarioLogado.id);
}

function converterValor(valor) {
    return Number(valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()) || 0;
}

async function lerMensagemErro(resposta, mensagemPadrao) {
    try {
        const texto = await resposta.text();

        if (!texto) {
            return mensagemPadrao;
        }

        const dados = JSON.parse(texto);
        return dados.message || dados.error || mensagemPadrao;
    } catch (erro) {
        return mensagemPadrao;
    }
}

async function carregarMetas() {
    try {
        await carregarConta();

        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/metas`);

        if (!resposta.ok) {
            mensagemMeta.textContent = "Não foi possivel carregar as metas.";
            return;
        }

        const metas = await resposta.json();

        renderizarMeta(metas);
        mensagemMeta.textContent = "Metas renderizadas";
    } catch (erro) {
        mensagemMeta.textContent = "Não foi possivel conectar com o servidor";
    }
}

function renderizarMeta(metas) {
    listaMeta.innerHTML = "";

    if (!metas || metas.length === 0) {
        listaMeta.innerHTML = `
            <tr>
                <td colspan="8">Nenhuma meta cadastrada.</td>
            </tr>
        `;

        totalMetasGuardado.textContent = formatarMoeda(0);
        totalMetasAlvo.textContent = formatarMoeda(0);
        progressoMetas.textContent = "0%";
        quantidadeMetasAtivas.textContent = 0;
        quantidadeMetasConcluidas.textContent = 0;

        return;
    }

    let totalGuardado = 0;
    let totalAlvo = 0;
    let metasAtivas = 0;
    let metasConcluidas = 0;

    metas.forEach((meta) => {
        totalGuardado += meta.valorAtual || 0;
        totalAlvo += meta.valorAlvo || 0;

        if (meta.status === "CONCLUIDA") {
            metasConcluidas ++;
        } else if (meta.status === "EM_ANDAMENTO") {
            metasAtivas ++;
        }

        const progresso = meta.valorAlvo > 0
            ? ((meta.valorAtual || 0) / meta.valorAlvo) * 100
            : 0;
            
            listaMeta.innerHTML += `
                <tr>
                <td>${meta.nome}</td>
                <td>${meta.descricao || "-"}</td>
                <td>${formatarMoeda(meta.valorAtual)}</td>
                <td>${formatarMoeda(meta.valorAlvo)}</td>
                <td>${progresso.toFixed(1)}%</td>
                <td>${meta.dataLimite || "-"}</td>
                <td>${meta.status}</td>
                <td>
                    ${meta.status === "EM_ANDAMENTO" ? `
                        <button type="button" onclick="adicionarValorMeta(${meta.id})">Adicionar</button>
                        <button type="button" onclick="cancelarMeta(${meta.id})">Cancelar</button>
                    ` : "-"}
                </td>
            </tr>
            `;
    });

    totalMetasGuardado.textContent = formatarMoeda(totalGuardado);
    totalMetasAlvo.textContent = formatarMoeda(totalAlvo);
    progressoMetas.textContent = totalAlvo > 0
        ? `${((totalGuardado / totalAlvo) * 100).toFixed(1)}%`
        : "0%";
    
    quantidadeMetasAtivas.textContent = metasAtivas;
    quantidadeMetasConcluidas.textContent = metasConcluidas;
}

formMeta.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    try {

        if (!contaAtual) {
            await carregarConta();
        }

        const nome = document.getElementById("nomeMeta").value.trim();
        const descricao = document.getElementById("descricaoMeta").value.trim();
        const valorAlvo = converterValor(document.getElementById("valorAlvoMeta").value);
        const valorAtual = converterValor(document.getElementById("valorAtualMeta").value);
        const dataLimite = document.getElementById("dataLimiteMeta").value;

        if (!nome || valorAlvo <= 0) {
            mensagemMeta.textContent = "Informe o nome e um valor alvo valido.";
            return;
        }

        const meta = {
            nome: nome,
            descricao: descricao,
            valorAlvo: valorAlvo,
            valorAtual: valorAtual,
            dataLimite: dataLimite || null
        };

        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/metas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meta)
        });

        if (!resposta.ok) {
            mensagemMeta.textContent = await lerMensagemErro(resposta, "Não foi possivel criar a meta.");
            return;
        }

        formMeta.reset();
        await carregarMetas();
        mensagemMeta.textContent = "Meta criada com sucesso.";
    } catch (erro) {
        mensagemMeta.textContent = "Erro ao criar meta.";
    }
});

async function adicionarValorMeta(metaId) {
    const valorDigitado = prompt("Quanto deseja adicionar nessa meta?");

    if (!valorDigitado) {
        return;
    }

    const valor = converterValor(valorDigitado);

    if (valor <= 0) {
        mensagemMeta.textContent = "Informe um valor valido.";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/metas/${metaId}/adicionar-valor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ valor: valor })
        });

        if (!resposta.ok) {
            mensagemMeta.textContent = await lerMensagemErro(resposta, "Não foi possivel adicionar valor na meta.");
            return;
        }

        await carregarMetas();
        mensagemMeta.textContent = "Valor adicionado com sucesso.";
    } catch (erro) {
        mensagemMeta.textContent = "Erro ao adicionar valor na meta.";
    }
}

async function cancelarMeta(metaId) {
    const confirmar = confirm("Tem certeza que deseja cancelar essa meta?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/metas/${metaId}/cancelar`, {
            method: "POST"
        });

        if (!resposta.ok) {
            mensagemMeta.textContent = await lerMensagemErro(resposta, "Não foi possivel cancelar a meta.");
            return;
        }

        await carregarMetas();
        mensagemMeta.textContent = "Meta cancelada com sucesso.";
    } catch (erro) {
        mensagemMeta.textContent = "Erro ao cancelar meta.";
    }
}


if (!deveRedirecionar) {
    carregarMetas();
}

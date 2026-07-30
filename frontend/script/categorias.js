const API_URL_CATEGORIAS = "http://localhost:8080";

const tabelaCategorias = document.getElementById("tabela-categorias");
const formCategoria = document.getElementById("form-categoria");
const categoriaIdInput = document.getElementById("categoriaId");
const nomeCategoriaInput = document.getElementById("nomeCategoria");
const tipoCategoriaInput = document.getElementById("tipoCategoria");
const corCategoriaInput = document.getElementById("corCategoria");
const iconeCategoriaInput = document.getElementById("iconeCategoria");
const ativaCategoriaInput = document.getElementById("ativaCategoria");
const mensagemCategoria = document.getElementById("mensagem-categoria");

const tituloFormCategoria = document.getElementById("titulo-form-categoria");
const botaoSalvarCategoria = document.getElementById("botao-salvar-categoria");
const botaoCancelarEdicaoCategoria = document.getElementById("botao-cancelar-edicao-categoria");

const totalCategorias = document.getElementById("total-categorias");
const categoriasAtivas = document.getElementById("categorias-ativas");
const categoriasInativas = document.getElementById("categorias-inativas");

const filtroTipoCategoria = document.getElementById("filtroTipoCategoria");
const filtroStatusCategoria = document.getElementById("filtroStatusCategoria");
const botaoLimparFiltrosCategoria = document.getElementById("botao-limpar-filtros-categoria");

let categorias = [];

async function carregarCategorias() {
    mensagemCategoria.textContent = "Carregando categorias...";

    try {
        const resposta = await fetch(`${API_URL_CATEGORIAS}/categorias`);

        if (!resposta.ok) {
            mensagemCategoria.textContent = "Nao foi possivel carregar categorias.";
            return;
        }

        categorias = await resposta.json();

        atualizarCards();
        renderizarCategorias();
        mensagemCategoria.textContent = "";
    } catch (erro) {
        console.error(erro);
        mensagemCategoria.textContent = "Nao foi possivel conectar com o servidor.";
    }
}

function atualizarCards() {
    totalCategorias.textContent = categorias.length;

    const ativas = categorias.filter((categoria) => categoria.ativa).length;
    const inativas = categorias.filter((categoria) => !categoria.ativa).length;

    categoriasAtivas.textContent = ativas;
    categoriasInativas.textContent = inativas;
}

function filtrarCategorias() {
    let categoriasFiltradas = [...categorias];

    if (filtroTipoCategoria.value !== "TODAS") {
        categoriasFiltradas = categoriasFiltradas.filter((categoria) => categoria.tipo === filtroTipoCategoria.value);
    }

    if (filtroStatusCategoria.value === "ATIVAS") {
        categoriasFiltradas = categoriasFiltradas.filter((categoria) => categoria.ativa);
    }

    if (filtroStatusCategoria.value === "INATIVAS") {
        categoriasFiltradas = categoriasFiltradas.filter((categoria) => !categoria.ativa);
    }

    return categoriasFiltradas;
}

function renderizarCategorias() {
    const categoriasFiltradas = filtrarCategorias();

    tabelaCategorias.innerHTML = "";

    if (categoriasFiltradas.length === 0) {
        tabelaCategorias.innerHTML = `
            <tr>
                <td colspan="7">Nenhuma categoria encontrada.</td>
            </tr>
        `;
        return;
    }

    categoriasFiltradas.forEach((categoria) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${categoria.id}</td>
            <td>${categoria.nome}</td>
            <td>${categoria.tipo}</td>
            <td>
                <span style="
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: ${categoria.cor || "#d4af37"};
                    border: 1px solid #ffffff33;
                "></span>
                ${categoria.cor || "-"}
            </td>
            <td>${categoria.icone || "-"}</td>
            <td>${categoria.ativa ? "Ativa" : "Desativada"}</td>
            <td>
                <button type="button" onclick="prepararEdicaoCategoria(${categoria.id})">Editar</button>
                <button type="button" onclick="desativarCategoria(${categoria.id})">Desativar</button>
                <button type="button" onclick="deletarCategoria(${categoria.id})">Excluir</button>
            </td>
        `;

        tabelaCategorias.appendChild(linha);
    });
}

formCategoria.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const categoria = {
        nome: nomeCategoriaInput.value.trim(),
        tipo: tipoCategoriaInput.value,
        cor: corCategoriaInput.value,
        icone: iconeCategoriaInput.value,
        ativa: ativaCategoriaInput.value === "true"
    };

    const categoriaId = categoriaIdInput.value;

    const url = categoriaId
        ? `${API_URL_CATEGORIAS}/categorias/${categoriaId}`
        : `${API_URL_CATEGORIAS}/categorias`;

    const metodo = categoriaId ? "PUT" : "POST";

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoria)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemCategoria.textContent = erro.erro || "Erro ao salvar categoria.";
            return;
        }

        mensagemCategoria.textContent = categoriaId
            ? "Categoria atualizada com sucesso."
            : "Categoria cadastrada com sucesso.";

        limparFormularioCategoria();
        carregarCategorias();
    } catch (erro) {
        console.error(erro);
        mensagemCategoria.textContent = "Nao foi possivel conectar com o servidor.";
    }
})

function prepararEdicaoCategoria(id) {
    const categoria = categorias.find((item) => item.id === id);

    if (!categoria) {
        mensagemCategoria.textContent = "Categoria nao encontrada.";
        return;
    }

    categoriaIdInput.value = categoria.id;
    nomeCategoriaInput.value = categoria.nome;
    tipoCategoriaInput.value = categoria.tipo;
    corCategoriaInput.value = categoria.cor || "#d4af37";
    iconeCategoriaInput.value = categoria.icone || "";
    ativaCategoriaInput.value = String(categoria.ativa);

    tituloFormCategoria.textContent = "Editar categoria";
    botaoSalvarCategoria.textContent = "Salvar alteracoes";
}

function limparFormularioCategoria() {
    formCategoria.reset();
    categoriaIdInput.value = "";
    corCategoriaInput.value = "#d4af37";
    ativaCategoriaInput.value = "true";

    tituloFormCategoria.textContent = "Nova categoria";
    botaoSalvarCategoria.textContent = "Cadastrar categoria";
}

botaoCancelarEdicaoCategoria.addEventListener("click", limparFormularioCategoria);

async function desativarCategoria(id) {
    try {
        const resposta = await fetch(`${API_URL_CATEGORIAS}/categorias/${id}/desativar`, {
            method: "PATCH"
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemCategoria.textContent = erro.erro || "Erro ao desativar categoria.";
            return;
        }

        mensagemCategoria.textContent = "Categoria desativada com sucesso.";
        carregarCategorias();
    } catch (erro) {
        console.error(erro);
        mensagemCategoria.textContent = "Nao foi possivel conectar com o servidor.";
    }
}

async function deletarCategoria(id) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL_CATEGORIAS}/categorias/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemCategoria.textContent = erro.erro || "Erro ao deletar esta categoria.";
            return;
        }

        mensagemCategoria.textContent = "Categoria excluida com sucesso.";
        carregarCategorias();
    } catch (erro) {
        console.error(erro);
        mensagemCategoria.textContent = "Nao foi possivel conectar com o servidor.";
    }
}

filtroTipoCategoria.addEventListener("change", renderizarCategorias);
filtroStatusCategoria.addEventListener("change", renderizarCategorias);

botaoLimparFiltrosCategoria.addEventListener("click", () => {
    filtroTipoCategoria.value = "TODAS";
    filtroStatusCategoria.value = "TODAS";
    renderizarCategorias();
});

carregarCategorias();

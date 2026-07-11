const tituloContaEmpresa = document.getElementById("titulo-conta-empresa");
const saldoContaEmpresa = document.getElementById("saldo-conta-empresa");
const titularContaEmpresa = document.getElementById("titular-conta-empresa");
const limiteContaEmpresa = document.getElementById("limite-conta-empresa");
const numeroContaEmpresa = document.getElementById("numero-conta-empresa");
const tipoContaEmpresa = document.getElementById("tipo-conta-empresa");
const chavePixContaEmpresa = document.getElementById("chave-pix-conta-empresa");
const tipoChavePixContaEmpresa = document.getElementById("tipo-chave-pix-conta-empresa");
const nomeEmpresaConta = document.getElementById("nome-empresa-conta");
const cnpjEmpresaConta = document.getElementById("cnpj-empresa-conta");
const emailEmpresaConta = document.getElementById("email-empresa-conta");
const telefoneEmpresaConta = document.getElementById("telefone-empresa-conta");
const mensagemContaEmpresa = document.getElementById("mensagem-conta-empresa");

const empresaLogada = pegarEmpresaLogada();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(empresaLogada);

async function carregarContaEmpresa() {
    try {
        const contaEmpresa = await buscarContaDaEmpresa(empresaLogada.id);

        tituloContaEmpresa.textContent = `Ola, ${empresaLogada.nomeFantasia}`;
        mensagemContaEmpresa.textContent = "Conta empresarial Eclipse Bank";

        titularContaEmpresa.textContent = contaEmpresa.titular || "-";
        saldoContaEmpresa.textContent = formatarMoeda(contaEmpresa.saldo);
        limiteContaEmpresa.textContent = formatarMoeda(contaEmpresa.limite);
        numeroContaEmpresa.textContent = contaEmpresa.numero || "-";
        chavePixContaEmpresa.textContent = contaEmpresa.chavePix || "-";
        tipoContaEmpresa.textContent = contaEmpresa.tipoConta || "EMPRESA";
        tipoChavePixContaEmpresa.textContent = contaEmpresa.tipoChavePix || "-";

        nomeEmpresaConta.textContent = empresaLogada.nomeFantasia || "-";
        cnpjEmpresaConta.textContent = empresaLogada.cnpj || "-";
        emailEmpresaConta.textContent = empresaLogada.email || "-";
        telefoneEmpresaConta.textContent = empresaLogada.telefone || "-";
    } catch (erro) {
        mensagemContaEmpresa.textContent = "Nao foi possivel carregar a conta empresarial.";
    }
}

if (!deveRedirecionar) {
    carregarContaEmpresa();
}

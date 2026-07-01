function criarSidebar() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
        <h1>Eclipse</h1>

        <nav>
            <a href="index.html">Dashboard</a>
            <a href="usuarios.html">Usuarios</a>
            <a href="contas.html">Contas</a>
            <a href="dados.html">Meus dados</a>
            <a href="minha-conta.html">Minha conta</a>
            <a href="transferencias.html">Transferencias</a>
            <a href="extrato.html">Extrato</a>
            <a href="#">Relatorios</a>
        </nav>
    `;

    document.body.prepend(sidebar);
}

criarSidebar();

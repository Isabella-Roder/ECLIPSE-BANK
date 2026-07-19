# Eclipse Bank - Requisitos do Sistema

## 1. Visão Geral

O **Eclipse Bank** é um sistema bancário fictício com foco em controle financeiro pessoal. A aplicação deve permitir que o usuário controle sua conta, acompanhe receitas e despesas, visualize um dashboard financeiro, gerencie cartões, metas e relatórios.

O projeto será desenvolvido usando duas linguagens:

- **Java**: sistema principal, regras bancárias, usuários, contas, transações, cartões e API.
- **Python**: análise financeira, geração de relatórios, gráficos, indicadores e processamento de dados.

## 2. Objetivos

- Criar uma conta bancária fictícia para cada usuário.
- Permitir futuramente conta de empresa com CNPJ.
- Permitir controle de saldo, entradas, saídas e transferências.
- Exibir um dashboard com informações financeiras importantes.
- Registrar receitas, despesas, depósitos, saques e pagamentos.
- Permitir pagamentos por transferencia, Pix e boleto ficticio.
- Permitir futuramente leitura de codigo de barras e QR Code pela camera do celular.
- Gerar comprovantes de pagamento e transferencia futuramente.
- Permitir imprimir comprovantes futuramente.
- Permitir baixar comprovantes em PDF futuramente.
- Gerenciar categorias de gastos.
- Controlar cartão de crédito, compras e faturas.
- Criar metas financeiras.
- Gerar relatórios com gráficos e resumo mensal.

## 3. Módulos do Sistema

### 3.1 Conta do Usuário

O sistema deve permitir que o usuário tenha uma conta própria no Eclipse Bank.

Status atual:

- [x] Cadastro de usuário implementado.
- [x] Listagem de usuários implementada.
- [x] Busca de usuário por ID implementada.
- [x] Nome social implementado.
- [x] CPF como texto implementado.
- [x] Validação de CPF único implementada.
- [x] Validação de email único implementada.
- [x] Validação de campos obrigatórios do usuário implementada.
- [x] Login simples com email e senha implementado.
- [x] Tela de login implementada.
- [x] Logout pelo menu lateral implementado.
- [x] Confirmacao de senha na criacao de conta implementada.
- [x] Botao mostrar/ocultar senha implementado.
- [x] Criacao de usuario e conta pela tela de login implementada.
- [x] Rota unica `/abertura-conta` implementada para criar usuario e conta juntos.
- [ ] Login com conta Google ainda não implementado.
- [~] Proteção de telas usando usuário logado implementada parcialmente.

Requisitos:

- Cadastrar usuário.
- Cadastrar empresa futuramente.
- Fazer login.
- Consultar dados da conta.
- Consultar saldo atual.
- Ter uma conta corrente vinculada ao usuário.
- Ter uma chave Pix fictícia.
- Ter telefone cadastrado.
- Permitir telefone como chave Pix.
- Permitir geracao de chave Pix aleatoria.
- Melhorar cadastro com mascaras, confirmacao de senha e validacoes.
- Diferenciar conta pessoa fisica e conta empresa futuramente.

### 3.2 Dashboard Financeiro

O dashboard deve apresentar um resumo da vida financeira do usuário.

Status atual:

- [x] Dashboard principal criado no frontend.
- [x] Endpoint `/dashboard` implementado.
- [x] Saldo total calculado com base nas contas.
- [x] Total de contas cadastrado exibido.
- [x] Total de usuários cadastrado exibido.
- [~] Resumo financeiro implementado parcialmente.
- [ ] Maior gasto ainda não implementado.
- [ ] Categorias mais usadas ainda não implementadas.

Informações exibidas:

- Saldo atual.
- Entradas do mês.
- Saídas do mês.
- Economia do mês.
- Maior gasto.
- Categorias mais usadas.
- Resumo de receitas e despesas.
- Situação das metas financeiras.
- Situação da fatura do cartão.

### 3.3 Lançamentos

O sistema deve permitir o cadastro e controle de movimentações financeiras.

Status atual:

- [x] Cadastro de transações implementado.
- [x] Listagem de transações implementada.
- [x] Depósito registrado como transação.
- [x] Saque registrado como transação.
- [x] Transferência registrada no extrato da origem e do destino.
- [x] Transferência por numero da conta implementada.
- [x] Transação vinculada a uma conta.
- [x] Horario das movimentacoes implementado com `dataHora`.
- [ ] Edição de lançamento ainda não implementada.
- [ ] Exclusão de lançamento ainda não implementada.

Tipos de lançamentos:

- Receita.
- Despesa.
- Transferência.
- Pagamento.
- Pix.
- Boleto.
- Depósito.
- Saque.

Requisitos:

- Cadastrar lançamento.
- Listar lançamentos.
- Editar lançamento.
- Excluir lançamento.
- Associar lançamento a uma categoria.
- Validar saldo antes de despesas, saques, pagamentos e transferências.

### 3.4 Categorias

O sistema deve possuir categorias para organizar receitas e despesas.

Categorias iniciais:

- Alimentação.
- Transporte.
- Lazer.
- Salário.
- Estudos.
- Saúde.

Requisitos:

- Listar categorias.
- Criar nova categoria.
- Editar categoria.
- Excluir categoria.
- Usar categorias nos filtros do extrato e relatórios.

### 3.5 Sistema Bancário

O sistema deve simular funcionalidades básicas de um banco digital.

Status atual:

- [x] Conta corrente implementada.
- [x] Conta vinculada a usuário implementada.
- [x] Chave Pix fictícia implementada como campo da conta.
- [x] Validação de chave Pix única implementada.
- [x] Número de conta único implementado.
- [x] Depósito implementado.
- [x] Saque implementado.
- [x] Transferência entre contas implementada.
- [x] Transferência por numero da conta implementada.
- [x] Validação de saldo em saque implementada.
- [x] Validação de saldo em transferência implementada.
- [x] Validação para impedir transferência para a mesma conta implementada.
- [~] Limite da conta implementado parcialmente.
- [x] Busca por chave Pix implementada para Pix.
- [x] Pix por telefone implementado.
- [x] Chave Pix aleatoria implementada.
- [x] Opcao para gerar chave Pix aleatoria na criacao da conta implementada.
- [x] Numero da conta gerado automaticamente pelo backend.
- [x] Pagamento de boleto ficticio implementado.

Funcionalidades:

- Conta corrente.
- Chave Pix fictícia.
- Transferência entre usuários.
- Transferência por numero da conta.
- Transferência por chave Pix.
- Pix por telefone.
- Depósito.
- Saque.
- Pagamento.
- Pagamento de boleto ficticio.
- Validação de saldo.
- Limite da conta.

Requisitos:

- Não permitir transações que deixem o saldo inválido, exceto se houver limite disponível.
- Registrar toda movimentação no extrato.
- Permitir transferência entre contas de usuários cadastrados.
- Permitir busca de usuário por chave Pix fictícia.
- Permitir pagamento por Pix, boleto ficticio e transferencia.
- Permitir telefone como uma chave Pix valida.
- Permitir geracao automatica de chave Pix aleatoria.

### 3.6 Extrato

O extrato deve listar todas as movimentações da conta.

Status atual:

- [x] Registro automático de depósito no extrato.
- [x] Registro automático de saque no extrato.
- [x] Registro automático de transferência enviada.
- [x] Registro automático de transferência recebida.
- [x] Consulta de extrato por conta implementada.
- [x] Tela `extrato.html` implementada.
- [x] Filtro por data implementado no frontend.
- [~] Filtro por mes implementado indiretamente por periodo.
- [x] Filtro por categoria no extrato da conta implementado no frontend.
- [x] Filtro por tipo implementado no frontend.
- [x] Filtro de extrato no backend por tipo, categoria e periodo implementado.
- [x] Rota unica `/contas/{contaId}/transacoes/filtro` implementada.
- [x] Integracao do `extrato.js` com endpoint de filtros do backend implementada.
- [x] Destaque visual de entrada e saida no extrato implementado.
- [x] Selo visual para tipo de movimentacao no extrato implementado.

Requisitos:

- Cadastrar transação no extrato automaticamente.
- Listar transações.
- Filtrar por tipo.
- Filtrar por mês.
- Filtrar por categoria.
- Filtrar por período.
- Exibir valor, data, descrição, tipo e categoria.

### 3.7 Cartões

O sistema deve possuir controle de cartão de crédito.

Status atual:

- [x] Entidade `Cartao` implementada.
- [x] Repository de cartoes implementado.
- [x] Service de cartoes implementado.
- [x] Controller de cartoes implementado.
- [x] Criacao de cartao vinculado a conta implementada.
- [x] Busca de cartao por conta implementada.
- [x] Validacao para impedir mais de um cartao por conta implementada.
- [x] Numero ficticio de cartao gerado automaticamente.
- [x] Entidade `CompraCartao` implementada.
- [x] Repository de compras no cartao implementado.
- [x] Service de compras no cartao implementado.
- [x] Controller de compras no cartao implementado.
- [x] Compra no cartao com validacao de limite implementada.
- [x] Limite disponivel diminui apos compra aprovada.
- [x] Tela `cartoes.html` implementada.
- [x] Consulta de cartao pelo frontend implementada.
- [x] Criacao de cartao pelo frontend implementada.
- [x] Registro de compras no cartao pelo frontend implementado.
- [x] Listagem de compras do cartao pelo frontend implementada.
- [x] Calculo de fatura atual implementado no backend.
- [x] Pagamento de fatura implementado no backend.
- [x] Pagamento de fatura desconta saldo da conta.
- [x] Pagamento de fatura restaura limite disponivel do cartao.
- [x] Pagamento de fatura registra transacao no extrato.
- [x] Botao de pagar fatura implementado no frontend.

Funcionalidades:

- Cartão de crédito.
- Cadastro de compras.
- Controle de fatura.
- Pagamento de fatura.

Requisitos:

- Cadastrar compra no cartão.
- Listar compras do cartão.
- Calcular fatura atual.
- Pagar fatura usando saldo da conta.
- Registrar pagamento da fatura no extrato.
- Validar limite do cartão antes de aprovar compra.

### 3.8 Metas Financeiras

O usuário deve poder cadastrar metas financeiras.

Status atual:

- [x] Entidade `MetaFinanceira` implementada.
- [x] Enum `StatusMeta` implementado.
- [x] Repository de metas financeiras implementado.
- [x] Service de metas financeiras implementado.
- [x] Controller de metas financeiras implementado.
- [x] Rota para criar meta por conta implementada.
- [x] Rota para listar metas por conta implementada.
- [x] Rota para adicionar valor em meta implementada.
- [x] Rota para cancelar meta implementada.
- [x] Tela `metas.html` implementada.
- [x] `metas.js` integrado com a conta do usuario logado.
- [x] Criacao de meta pelo frontend implementada.
- [x] Listagem de metas pelo frontend implementada.
- [x] Cards de resumo e progresso das metas implementados.
- [x] Adicao de valor em meta pelo frontend implementada.
- [x] Cancelamento de meta pelo frontend implementado.
- [x] Conclusao automatica ao atingir o valor alvo implementada.
- [x] Aporte inicial em meta desconta saldo da conta.
- [x] Adicao de valor em meta desconta saldo da conta.
- [x] Cancelamento de meta devolve valor guardado para o saldo da conta.
- [x] Aporte em meta gera transacao `APORTE_META` no extrato.
- [x] Resgate de meta cancelada gera transacao `RESGATE_META` no extrato.
- [x] Operacoes de metas protegidas com transacao para evitar saldo inconsistente.

Metas iniciais sugeridas:

- Guardar R$ 1.000.
- Viajar.
- Comprar notebook.
- Reserva de emergência.

Requisitos:

- Criar meta.
- Definir valor alvo.
- Definir valor já guardado.
- Atualizar progresso da meta.
- Listar metas.
- Exibir metas no dashboard.

### 3.9 Relatórios

O sistema deve gerar relatórios financeiros para ajudar o usuário a entender seus gastos.

Status atual:

- [x] Tela `relatorios.html` implementada.
- [x] `relatorios.js` implementado.
- [x] Relatorio integrado com conta do usuario logado.
- [x] Relatorio busca transacoes da conta.
- [x] Relatorio busca metas financeiras da conta.
- [x] Cards de entradas, saidas, resultado, saldo e metas implementados.
- [x] Resumo por categoria implementado.
- [x] Categoria principal implementada.
- [x] Ultimas movimentacoes implementadas.
- [x] Insight financeiro automatico inicial implementado.
- [x] Filtros por periodo e tipo implementados no frontend.
- [x] Graficos implementados no frontend com canvas.
- [~] Relatorios com Python iniciados com leitura de JSON, resumo por categoria, resumo mensal, metas e insight automatico.
- [ ] Exportacao de relatorios ainda nao implementada.

Relatórios:

- Gastos por categoria.
- Evolução do saldo.
- Receita vs despesas.
- Fatura do cartão.
- Progresso das metas.
- Resumo mensal.

Requisitos:

- Gerar gráficos.
- Gerar resumo mensal.
- Permitir filtros por mês e categoria.
- Usar Python para processar dados e gerar indicadores.

### 3.10 Pagamentos

O sistema deve possuir uma area de pagamentos para concentrar as operacoes bancarias do cliente.

Status atual:

- [x] Transferencia por numero da conta implementada.
- [x] Entidade `Pagamento` implementada.
- [x] Repository de pagamentos implementado.
- [x] Service de pagamentos implementado com transferencia, Pix e boleto.
- [x] Controller de pagamentos implementado.
- [x] Rota `POST /pagamentos` implementada.
- [x] Tela `pagamentos.html` implementada.
- [x] Pagamento por transferencia salvo no banco.
- [x] Pix por chave Pix implementado.
- [x] Pix por telefone implementado.
- [ ] Pix por QR Code ainda nao implementado.
- [x] Pagamento de boleto ficticio implementado.
- [ ] Leitura de codigo de barras pela camera ainda nao implementada.
- [ ] Leitura de QR Code pela camera ainda nao implementada.
- [x] Historico visual de pagamentos implementado em `pagamentos.html`.
- [x] Historico real de comprovantes implementado com tela propria `comprovantes.html`.
- [x] Comprovante de pagamento por transferencia, Pix e boleto implementado.
- [x] Comprovante de transferencia visual implementado.
- [x] Entidade `Comprovante` implementada.
- [x] Repository de comprovantes implementado.
- [x] Service de comprovantes implementado.
- [x] Controller de comprovantes implementado.
- [x] Rota `GET /comprovantes/{id}` implementada.
- [x] Rota `GET /contas/{contaId}/comprovantes` implementada.
- [x] Comprovantes de pagamentos salvos no banco.
- [x] Botao para ver comprovante no historico de pagamentos implementado.
- [x] Botao de imprimir comprovante implementado.
- [ ] Download de comprovante em PDF ainda nao implementado.

Metodos de pagamento previstos:

- Transferencia por numero da conta.
- Pix por chave Pix.
- Pix por telefone.
- Pix por QR Code.
- Boleto ficticio.
- Boleto por codigo de barras escaneado.
- Outros metodos de pagamento futuramente.

Requisitos:

- Permitir que o cliente escolha o metodo de pagamento.
- Validar saldo antes de concluir qualquer pagamento.
- Registrar pagamentos no extrato.
- Registrar data e horario do pagamento.
- Permitir pagamento de boleto ficticio com codigo digitado.
- Permitir Pix usando chave Pix cadastrada.
- Permitir Pix usando telefone cadastrado como chave Pix.
- Permitir Pix usando QR Code futuramente.
- Permitir abrir a camera no celular para ler QR Code.
- Permitir abrir a camera no celular para ler codigo de barras de boleto.
- Gerar comprovante apos pagamento aprovado.
- Gerar comprovante apos transferencia aprovada.
- Permitir visualizar ou baixar comprovante futuramente.
- Permitir imprimir comprovante futuramente.
- Permitir baixar comprovante em PDF futuramente.

### 3.11 Conta Empresa

O sistema deve permitir futuramente a criacao de contas para empresas, usando CNPJ.

Status atual:

- [x] Entidade `Empresa` implementada.
- [x] Repository de empresas implementado.
- [x] Service de empresas implementado.
- [x] Controller de empresas implementado.
- [x] Cadastro de empresa implementado.
- [x] Listagem de empresas implementada.
- [x] Busca de empresa por ID implementada.
- [x] CNPJ implementado como campo da empresa.
- [x] Validacao de CNPJ unico implementada.
- [x] Validacao de email unico para empresa implementada.
- [x] Conta empresa implementada.
- [x] Criacao automatica de conta empresarial ao cadastrar empresa.
- [x] Busca de conta por empresa implementada.
- [x] Separacao entre conta pessoa fisica e conta empresa implementada com `TipoConta`.
- [x] Validacao para impedir conta com usuario e empresa ao mesmo tempo.
- [x] Login empresarial com email e senha implementado.
- [x] Tela `empresas.html` implementada para cadastro/listagem de empresas.
- [x] Dashboard PJ `empresa-dashboard.html` implementado.
- [x] Tela `empresa-conta.html` implementada para dados da conta empresarial.
- [x] Tela `empresa-pagamentos.html` implementada para pagamentos PJ.
- [x] Tela `extrato-empresa.html` implementada para extrato PJ.
- [x] Tela `empresa-cartoes.html` implementada para cartao PJ.
- [x] Comprovantes PJ integrados ao historico real de comprovantes.
- [x] Menu lateral separado para area PJ implementado.
- [~] Protecao da area PJ por `empresaLogada` implementada parcialmente.

Requisitos:

- Cadastrar empresa.
- Informar razao social.
- Informar nome fantasia.
- Informar CNPJ.
- Validar CNPJ unico.
- Criar conta bancaria vinculada a empresa.
- Diferenciar conta pessoa fisica e conta empresa.
- Permitir chave Pix para empresa.
- Permitir telefone como chave Pix da empresa futuramente.
- Permitir login de empresa.
- Exibir dashboard da empresa logada.
- Exibir dados da conta empresarial da empresa logada.

## 4. Divisão Entre Java e Python

### 4.1 Java

Java será usado como base principal do sistema.

Responsabilidades:

- API do sistema.
- Cadastro e autenticação de usuários.
- Regras de conta bancária.
- Controle de saldo.
- Transações.
- Transferências.
- Pix fictício.
- Pagamentos.
- Transferencia por numero da conta.
- Transferencia por chave Pix.
- Pagamento de boleto ficticio.
- Cartões.
- Faturas.
- Metas financeiras.
- Persistência dos dados.

Sugestão de tecnologia:

- Java com Spring Boot.
- Banco de dados PostgreSQL ou MySQL.
- API REST.

### 4.2 Python

Python será usado para a parte analítica do projeto.

Responsabilidades:

- Gerar relatórios.
- Calcular indicadores financeiros.
- Processar dados de transações.
- Gerar gráficos.
- Criar análises mensais.

Sugestão de tecnologia:

- Python com FastAPI ou scripts separados.
- Pandas para análise de dados.
- Matplotlib ou Plotly para gráficos.

## 5. Integração Entre Java e Python

Opções possíveis:

### Opção 1: Java chama uma API em Python

- Java envia os dados para uma API Python.
- Python processa os dados.
- Python devolve relatórios, gráficos ou indicadores.

Essa é a melhor opção se o projeto crescer.

### Opção 2: Java exporta dados e Python lê arquivos

- Java gera arquivos `.json` ou `.csv`.
- Python lê os arquivos.
- Python gera relatórios.

Essa opção é mais simples para começar.

## 6. MVP - Primeira Versão

Para começar o projeto, a primeira versão deve conter:

Status atual do MVP:

- [x] Cadastro de usuário.
- [x] Login simples com email e senha.
- [ ] Login com conta Google.
- [~] Uso automatico do usuario logado nas telas.
- [x] Conta corrente com saldo.
- [x] Cadastro de receitas/transações.
- [x] Cadastro de despesas/transações.
- [x] Depósito.
- [x] Saque.
- [x] Transferência entre contas.
- [x] Transferência por numero da conta.
- [x] Extrato.
- [~] Categorias fixas.
- [x] Dashboard com saldo e dados gerais.
- [~] Dashboard ainda pode evoluir para entradas, saídas, economia, maior gasto e categorias mais usadas.

- Cadastro de usuário.
- Login.
- Conta corrente com saldo.
- Cadastro de receitas.
- Cadastro de despesas.
- Depósito.
- Saque.
- Extrato.
- Categorias.
- Dashboard com saldo, entradas, saídas e economia.

Depois do MVP, podem ser adicionados:

- Transferência entre usuários.
- Pix fictício.
- Pix por telefone.
- Pix por chave Pix.
- Pagamento de boleto ficticio.
- Cartão de crédito.
- Fatura.
- Metas financeiras.
- Relatórios com Python.
- Gráficos.

## 7. Entidades Principais

Entidades sugeridas para o sistema:

- Usuário.
- Empresa.
- Conta.
- Transação.
- Categoria.
- Cartão.
- CompraCartão.
- Fatura.
- MetaFinanceira.
- Relatório.
- Comprovante.

## 8. Regras de Negócio

- Toda movimentação deve ser registrada no extrato.
- Despesas, saques, pagamentos e transferências devem validar saldo.
- Transferência só pode acontecer entre usuários existentes.
- Compras no cartão devem validar limite disponível.
- Pagamento de fatura deve diminuir o saldo da conta.
- Receitas e depósitos devem aumentar o saldo.
- Despesas, saques e pagamentos devem diminuir o saldo.
- O dashboard deve considerar os dados do mês atual.
- Pagamentos devem registrar data e horario.
- Transferencias devem registrar data e horario.
- Pagamentos aprovados devem gerar comprovante.
- Transferencias aprovadas devem gerar comprovante.
- A conta destino deve receber o valor transferido.
- A conta origem deve perder o valor transferido.
- Chaves Pix devem ser unicas.
- Telefone pode ser usado como chave Pix quando cadastrado.
- CNPJ deve ser unico para contas empresa.

## 9. Ideias Futuras

- Notificações de gastos altos.
- Alerta quando a fatura estiver perto do vencimento.
- Planejamento mensal.
- Exportação de relatórios em PDF.
- Modo administrador.
- Simulador de investimentos.
- Recomendação automática de economia usando Python.

## 10. Perfis do Sistema

O sistema deve considerar tres tipos principais de uso: cliente pessoa fisica, empresa e administracao.

Status atual:

- [~] Telas de cliente começaram a ser separadas.
- [x] Login empresarial implementado.
- [x] Empresa logada salva no `localStorage` como `empresaLogada`.
- [x] Menu lateral separado para pessoa fisica, empresa e administracao/desenvolvimento.
- [x] Protecao basica de telas por tipo de login no frontend.
- [x] Dashboard PJ criado.
- [x] Tela de conta empresarial criada.
- [x] Tela `dados.html` criada para dados pessoais.
- [x] Tela `minha-conta.html` criada para dados da conta.
- [x] `minha-conta.html` reorganizada como painel bancario do cliente.
- [x] `dados.html` reorganizada como perfil cadastral do cliente.
- [x] Tela `transferencias.html` criada para transferência entre contas.
- [~] Telas administrativas existem, mas ainda sem controle de permissão.
- [x] Login simples implementado.
- [~] Login controla acesso de algumas telas do cliente.
- [~] Login controla acesso inicial de algumas telas da area PJ.
- [x] Logout implementado no menu lateral.
- [ ] Login com conta Google ainda não implementado.
- [~] Separação real entre cliente, empresa e administração implementada parcialmente.

### 10.1 Cliente

O cliente deve conseguir acessar e acompanhar suas proprias informacoes bancarias.

Requisitos:

- Visualizar seus dados pessoais.
- Visualizar nome social, quando informado.
- Consultar sua conta bancaria.
- Consultar saldo, limite, numero da conta e chave Pix.
- Realizar transferencias.
- Consultar extrato da propria conta.
- Acompanhar metas financeiras.
- Acompanhar investimentos.

### 10.2 Administracao

A administracao deve conseguir acompanhar e gerenciar dados gerais do sistema.

Requisitos:

- Cadastrar usuarios.
- Cadastrar contas para usuarios.
- Listar todos os usuarios.
- Listar todas as contas.
- Visualizar total de usuarios cadastrados.
- Visualizar total de contas cadastradas.
- Visualizar saldo total do sistema.
- Acompanhar transacoes.
- Gerar relatorios administrativos.

### 10.3 Empresa

A empresa deve conseguir acessar e acompanhar sua propria conta empresarial.

Status atual:

- [x] Login de empresa implementado.
- [x] Dashboard PJ implementado.
- [x] Tela de conta empresarial implementada.
- [x] Dados de empresa exibidos na area PJ.
- [x] Dados da conta empresarial exibidos na area PJ.
- [x] Pagamentos PJ implementados.
- [x] Extrato PJ implementado.
- [x] Comprovantes PJ implementados.
- [x] Cartoes PJ implementados.
- [x] Compras no cartao PJ implementadas.
- [~] Area PJ ainda pode evoluir com relatorios, investimentos e permissoes.

Requisitos:

- Visualizar razao social, nome fantasia, CNPJ, email e telefone.
- Consultar conta empresarial vinculada.
- Consultar saldo, limite, numero da conta e chave Pix da empresa.
- Acessar pagamentos PJ.
- Acessar extrato PJ.
- Acessar cartoes PJ.

## 11. Organizacao de Telas

O frontend deve ser dividido em telas especificas para evitar paginas muito grandes e facilitar a separacao entre visao do cliente e visao administrativa.

Status atual:

- [x] `index.html` implementado.
- [x] `usuarios.html` implementado.
- [x] `contas.html` implementado.
- [x] `transferencias.html` implementado.
- [x] `extrato.html` implementado.
- [x] `dados.html` implementado.
- [x] `minha-conta.html` implementado.
- [x] `login.html` implementado.
- [x] `layout.js` implementado para sidebar reutilizável.
- [x] Logout implementado no `layout.js`.
- [x] `pagamentos.html` implementado.
- [x] `cartoes.html` implementado.
- [x] `empresas.html` implementado.
- [x] `empresa-dashboard.html` implementado.
- [x] `empresa-conta.html` implementado.
- [x] Tela `comprovante.html` implementada para ultima operacao.
- [x] Tela `comprovantes.html` implementada para historico real de comprovantes.
- [x] Tela de relatórios implementada.
- [x] Tela de investimentos implementada.

Telas sugeridas:

- `index.html`: dashboard geral do sistema.
- `usuarios.html`: cadastro e listagem de usuarios.
- `contas.html`: cadastro, listagem, deposito e saque de contas.
- `transferencias.html`: transferencia entre contas.
- `extrato.html`: consulta de extrato por conta.
- `dados.html`: dados pessoais do cliente.
- `minha-conta.html`: informacoes da conta do cliente.
- `login.html`: login simples com email e senha.
- `pagamentos.html`: pagamentos por transferencia, Pix e boleto.
- `cartoes.html`: cartao do cliente, criacao de cartao e compras no cartao.
- `empresas.html`: cadastro, listagem e gestao inicial de empresas.
- `empresa-dashboard.html`: dashboard da empresa logada.
- `empresa-conta.html`: dados da conta empresarial da empresa logada.
- `empresa-pagamentos.html`: pagamentos por conta PJ.
- `extrato-empresa.html`: extrato da conta PJ.
- `empresa-cartoes.html`: cartao PJ, criacao de cartao e compras empresariais.
- `comprovantes.html`: consulta de comprovantes futuramente.
- `comprovante.html`: visualizacao do comprovante gerado apos uma operacao.

### 11.1 Dashboard

Requisitos:

- Exibir saldo total.
- Exibir total de contas cadastradas.
- Exibir total de usuarios cadastrados.
- Exibir ultimas transacoes.
- Exibir resumo financeiro.

### 11.2 Dados do Cliente

Requisitos:

- Consultar dados pessoais.
- Exibir nome, nome social, CPF, email e data de nascimento.
- Exibir telefone.
- Melhorar layout e organizacao das informacoes.
- Separar dados de identidade, contato e seguranca/cadastro.
- Exibir conta vinculada ao usuario.
- Exibir tipo de cliente futuramente.
- Permitir futura edicao de dados cadastrais.

### 11.3 Minha Conta

Requisitos:

- Consultar saldo.
- Consultar numero da conta.
- Consultar chave Pix.
- Consultar limite.
- Melhorar layout e organizacao das informacoes.
- Exibir saudacao do cliente.
- Exibir ultimas movimentacoes da conta.
- Exibir ultimos comprovantes da conta.
- Exibir atalhos para pagamentos, Pix, extrato e comprovantes.
- Acessar atalhos para transferencia e extrato.

### 11.4 Transferencias

Requisitos:

- Informar conta de origem.
- Informar conta de destino.
- Informar valor.
- Permitir transferencia usando numero da conta destino.
- Usar a conta do usuario logado como origem.
- Validar saldo da conta de origem.
- Nao permitir transferencia para a mesma conta.
- Registrar a saida no extrato da conta origem.
- Registrar a entrada no extrato da conta destino.

### 11.5 Pagamentos

Requisitos:

- Exibir opcoes de pagamento.
- Permitir transferencia por numero da conta.
- Permitir Pix por chave Pix.
- Permitir Pix por telefone.
- Permitir Pix por QR Code futuramente.
- Permitir pagamento de boleto ficticio.
- Permitir escanear codigo de barras de boleto usando a camera do celular futuramente.
- Permitir escanear QR Code de Pix usando a camera do celular futuramente.
- Gerar comprovante de pagamento.
- Gerar comprovante de transferencia.
- Exibir botao para imprimir comprovante.
- Exibir botao para baixar comprovante em PDF.
- Exibir mensagem de sucesso ou erro.
- Usar a conta do usuario logado como origem do pagamento.

### 11.6 Comprovantes

Requisitos:

- Exibir comprovante apos transferencia aprovada.
- Exibir comprovante apos pagamento aprovado.
- Mostrar valor, data, horario, conta origem e conta destino.
- Mostrar metodo usado: transferencia, Pix ou boleto.
- Mostrar pagador no comprovante.
- Ajustar o nome do destino conforme o metodo: conta destino, chave Pix ou codigo de boleto.
- Exibir metodo como selo visual.
- Permitir imprimir comprovante.
- Permitir baixar comprovante em PDF futuramente.
- Permitir consultar historico de comprovantes.
- Buscar comprovante individual pelo backend usando ID.

### 11.7 Empresas

Status atual:

- [x] Cadastrar empresa.
- [x] Listar empresas.
- [x] Criar conta automaticamente para empresa.
- [x] Exibir CNPJ, razao social e nome fantasia.
- [x] Separar conta empresa de conta pessoa fisica.
- [x] Exibir dashboard PJ para empresa logada.
- [x] Exibir dados da conta empresarial da empresa logada.
- [x] Menu lateral da area PJ.
- [x] Pagamentos PJ em tela propria implementado.
- [x] Extrato PJ em tela propria implementado.
- [x] Cartoes PJ em tela propria implementado.
- [x] Compras no cartao PJ implementadas.
- [x] Comprovantes PJ no historico real implementados.

Requisitos:

- Cadastrar empresa.
- Listar empresas.
- Criar conta para empresa.
- Exibir CNPJ, razao social e nome fantasia.
- Separar conta empresa de conta pessoa fisica.
- Permitir login empresarial.
- Exibir dashboard da empresa logada.
- Exibir dados da conta empresarial.

## 12. Investimentos

O sistema deve possuir uma area de investimentos ficticios para complementar o controle financeiro do Eclipse Bank.

Status atual:

- [x] Módulo inicial de investimentos implementado.
- [x] Tela de investimentos implementada.
- [x] Simulador inicial de investimentos implementado.
- [x] Entidade `Investimento` implementada.
- [x] Enums `TipoInvestimento`, `ProdutoInvestimento`, `PerfilInvestidor` e `StatusInvestimento` implementados.
- [x] Repository de investimentos implementado.
- [x] Service de investimentos implementado com aplicacao, resgate, validacao de saldo e rendimento estimado.
- [x] Controller de investimentos implementado.
- [x] Rota `POST /contas/{contaId}/investimentos` implementada.
- [x] Rota `GET /contas/{contaId}/investimentos` implementada.
- [x] Rota `POST /investimentos/{investimentoId}/resgatar` implementada.
- [x] Aplicacao de investimento desconta saldo da conta.
- [x] Resgate de investimento devolve valor aplicado + rendimento estimado para o saldo da conta.
- [x] Aplicacao de investimento gera transacao `APLICACAO_INVESTIMENTO` no extrato.
- [x] Resgate de investimento gera transacao `RESGATE_INVESTIMENTO` no extrato.
- [x] Investimentos possuem status `ATIVO` e `RESGATADO`.
- [x] Tela `investimentos.html` implementada.
- [x] `investimentos.js` integrado com a conta do usuario logado.
- [x] Listagem de investimentos da conta implementada.
- [x] Botao de resgate implementado no frontend.
- [x] Resumo da carteira considera apenas investimentos ativos.
- [x] Produtos de investimento passaram a ser fornecidos pelo backend.
- [x] Tela de detalhe do produto de investimento implementada.
- [x] Simulacao de rendimento por valor e prazo implementada no frontend.
- [x] Integracao inicial com API do Banco Central para indicadores financeiros.
- [x] Produtos de renda fixa/tesouro usam indicadores reais como referencia de taxa.
- [x] Indicadores Selic, CDI estimado e IPCA exibidos na tela de investimentos.
- [x] Prazo da aplicacao salvo no investimento.
- [x] Carteira de investimentos exibe prazo da aplicacao.
- [x] Backend calcula rendimento usando a taxa do produto de investimento e o prazo informado.
- [x] Modulo inicial de mercado B3 implementado com consulta mockada por ticker.
- [x] DTO, service e controller de ativos de mercado implementados.
- [x] Tela `mercado.html` implementada para buscar ativos como MXRF11 e PETR4.
- [x] Entidade `AtivoCarteira` implementada.
- [x] Repository de ativos da carteira implementado.
- [x] Service de ativos da carteira implementado com compra, validacao de saldo e desconto da conta.
- [x] Controller de ativos da carteira implementado.
- [x] Rota `POST /contas/{contaId}/ativos` implementada.
- [x] Rota `GET /contas/{contaId}/ativos` implementada.
- [x] Rota `POST /ativos/{ativoId}/vender` implementada.
- [x] Tela `ativo-detalhe.html` implementada para simular e comprar ativo.
- [x] Tela `carteira-ativos.html` implementada para listar ativos comprados.
- [x] `carteira-ativos.js` integrado com a conta do usuario logado.
- [x] Carteira de ativos exibe preco medio, preco atual e resultado por ativo.
- [x] Resultado positivo/negativo da carteira destacado visualmente.
- [x] Resultado total da carteira de renda variavel implementado no frontend.
- [x] Compra de ativo gera transacao `COMPRA_ATIVO` no extrato.
- [x] Venda de ativo gera transacao `VENDA_ATIVO` no extrato.
- [x] Venda de ativo devolve o valor para o saldo da conta.
- [~] Integracao com API da B3/API de mercado iniciada com estrutura preparada.
- [ ] Integracao real com API para acoes e fundos imobiliarios ainda nao implementada.
- [ ] Relatórios de investimentos com Python ainda não implementados.

### 12.1 Perfil do Investidor

Perfis sugeridos:

- Conservador.
- Moderado.
- Arrojado.

Requisitos:

- Permitir que o cliente escolha ou simule seu perfil de investidor.
- Usar o perfil para sugerir produtos ficticios no futuro.

### 12.2 Produtos de Investimento Ficticios

Produtos sugeridos:

- Renda fixa.
- Tesouro Eclipse.
- Carteira automatica.
- Cripto ficticia.
- Fundo Eclipse.
- Fundos imobiliarios como MXRF11, BTLG11 e outros, futuramente via API.
- Acoes listadas, futuramente via API.

Status atual:

- [x] Produtos de investimento expostos pela rota `GET /produtos-investimento`.
- [x] Frontend renderiza a vitrine de produtos automaticamente com dados do backend.
- [x] Produtos de renda fixa/tesouro podem usar indicadores reais como referencia.
- [x] Lista de produtos ampliada com CDB, Tesouro, fundos, ETF e cripto ficticia.
- [~] Produtos de acoes iniciados pela consulta de mercado por ticker.
- [~] Produtos de fundos imobiliarios iniciados pela consulta de mercado por ticker.
- [~] Cotacoes de FIIs/acoes estruturadas com dados mockados para futura API externa.
- [x] Compra simulada de acoes/FIIs salva em carteira de renda variavel.
- [x] Listagem da carteira de renda variavel no frontend.
- [x] Comparacao entre preco medio e cotacao atual na carteira.
- [x] Lucro/prejuizo estimado exibido na carteira.

### 12.3 Funcionalidades de Investimento

Requisitos:

- [x] Simular investimento.
- [x] Aplicar valor ficticio.
- [x] Resgatar valor ficticio.
- [x] Acompanhar rendimento.
- [x] Listar historico de aplicacoes.
- [x] Simular rendimento com prazo em meses na tela de detalhe.
- [x] Buscar indicadores financeiros reais via API do Banco Central.
- [x] Aplicar investimento usando no backend a mesma taxa exibida no produto.
- [x] Exibir indicadores financeiros reais no frontend.
- [x] Comprar ativo de renda variavel usando saldo da conta.
- [x] Vender ativo de renda variavel devolvendo saldo para a conta.
- [x] Listar ativos comprados por conta.
- [x] Calcular resultado estimado de ativos usando preco medio e preco atual.
- [x] Registrar compra e venda de ativos no extrato.
- [x] Registrar aplicacao e resgate de investimentos no extrato.
- [ ] Exibir grafico de evolucao.
- [~] Integrar futuramente com API da B3 ou outra API de mercado para consultar dados de acoes e FIIs.
- Usar dados de mercado apenas como referencia informativa, mantendo as operacoes do Eclipse Bank como ficticias/simuladas.

### 12.4 Dashboard de Investimentos

Requisitos:

- [x] Tela `investimentos-dashboard.html` implementada.
- [x] `investimentos-dashboard.js` implementado.
- [x] Exibir patrimonio total investido.
- [x] Exibir total em renda fixa.
- [x] Exibir total em renda variavel.
- [x] Exibir rendimento estimado.
- [x] Exibir distribuicao percentual entre renda fixa e renda variavel.
- [x] Exibir resumo de aplicacoes de renda fixa.
- [x] Exibir resumo de ativos de renda variavel.
- [x] Exibir resultado dos ativos usando cotacao atual.
- [x] Exibir leitura de saude da carteira de investimentos.
- [ ] Exibir rendimento do mes ainda nao implementado.
- [ ] Integrar dados com relatorios em Python futuramente.

## 13. Status Atual do Projeto

Legenda:

- `[x]` Implementado.
- `[~]` Implementado parcialmente.
- `[ ]` Ainda nao implementado.

### 13.1 Backend Java Spring Boot

- [x] Projeto Spring Boot criado.
- [x] API REST funcionando.
- [x] Banco H2 configurado.
- [x] Persistencia com JPA.
- [x] Cadastro de usuarios.
- [x] Listagem de usuarios.
- [x] Campo nome social no usuario.
- [x] CPF como texto.
- [x] Validacao de CPF unico.
- [x] Validacao de email unico.
- [x] Validacao de campos obrigatorios do usuario.
- [x] Telefone implementado no usuario.
- [x] Empresa implementada.
- [x] CNPJ implementado.
- [x] Conta empresa implementada.
- [x] Cadastro de empresa implementado.
- [x] Login empresarial implementado.
- [x] Conta empresarial criada automaticamente ao cadastrar empresa.
- [x] Separacao entre conta pessoa fisica e conta empresa com `TipoConta`.
- [x] Mascara de CPF implementada no cadastro de usuario.
- [x] Mascara de telefone implementada no cadastro de usuario.
- [x] Confirmacao de senha implementada.
- [x] Botao mostrar/ocultar senha implementado.
- [x] Cadastro de contas para usuarios.
- [x] Listagem de contas.
- [x] Saldo, limite, numero e chave Pix na conta.
- [x] Telefone como chave Pix implementado.
- [x] Geracao de chave Pix aleatoria implementada.
- [x] Numero da conta automatico implementado no backend.
- [x] Validacao de usuario com apenas uma conta.
- [x] Validacao de numero de conta unico.
- [x] Validacao de chave Pix unica.
- [x] Validacao de campos obrigatorios da conta.
- [x] Deposito em conta.
- [x] Saque em conta.
- [x] Validacao de saldo para saque.
- [x] Transferencia entre contas.
- [x] Transferencia por numero da conta.
- [x] Validacao para nao transferir para a mesma conta.
- [x] Validacao de saldo para transferencia.
- [x] Registro de deposito no extrato.
- [x] Registro de saque no extrato.
- [x] Registro de transferencia no extrato da origem e do destino.
- [x] Transacao vinculada a conta.
- [x] Extrato por conta.
- [x] Filtros do extrato por tipo, categoria e periodo no backend.
- [x] Rota unica de filtro do extrato por conta.
- [x] Busca de conta por ID.
- [x] Busca de usuario por ID.
- [x] Login simples por email e senha.
- [x] Logout pelo frontend.
- [x] Busca de conta por usuario logado.
- [x] Transferencia por numero da conta.
- [x] Modulo inicial de cartoes implementado.
- [x] Criacao e consulta de cartao por conta.
- [x] Modulo inicial de compras no cartao implementado.
- [x] Compra no cartao valida limite disponivel.
- [x] Limite disponivel do cartao diminui apos compra aprovada.
- [x] Dashboard com saldo total, total de contas e total de usuarios.
- [x] Tratamento de erro com `ErroController`.
- [~] Categorias fixas.

### 13.2 Frontend HTML, CSS e JavaScript

- [x] Layout visual escuro inspirado no Eclipse Bank.
- [x] Sidebar reutilizavel com `layout.js`.
- [x] Dashboard principal.
- [x] Tela de usuarios.
- [x] Cadastro de usuarios pelo HTML.
- [x] Listagem de usuarios pelo HTML.
- [x] Campo nome social na tela de usuarios.
- [x] Tela de contas.
- [x] Cadastro de conta pelo HTML.
- [x] Listagem de contas pelo HTML.
- [x] Deposito pelo HTML.
- [x] Saque pelo HTML.
- [x] Tela de extrato.
- [x] Consulta de extrato por conta pelo HTML.
- [x] Filtros do extrato pelo HTML.
- [x] Filtros do extrato integrados com o backend.
- [x] Extrato com destaque visual de entrada, saida e tipo.
- [x] Tela de transferencias.
- [x] Transferencia entre contas pelo HTML.
- [x] Tela minha conta.
- [x] Tela minha conta reorganizada como painel bancario do cliente.
- [x] Consulta de dados da conta pelo HTML.
- [x] Tela de dados do cliente.
- [x] Tela de dados reorganizada como perfil cadastral do cliente.
- [x] Consulta de dados do usuario pelo HTML.
- [x] Tela de login.
- [x] Login pelo HTML.
- [x] Login com tratamento de erro no frontend.
- [x] Criacao de usuario e conta pela tela de login.
- [x] Confirmacao de senha na abertura de conta.
- [x] Botao mostrar/ocultar senha.
- [x] Email preenchido automaticamente no login apos criar conta.
- [x] Usuario logado salvo no `localStorage`.
- [x] Logout pelo menu lateral.
- [x] Tela de dados usando usuario logado.
- [x] Tela minha conta usando usuario logado.
- [x] Tela de extrato usando usuario logado.
- [x] Tela de transferencias usando conta do usuario logado como origem.
- [x] Transferencia por numero da conta pelo HTML.
- [x] Mascara de CPF implementada.
- [x] Mascara de telefone implementada.
- [x] Mascara de dinheiro/valor implementada em conta, deposito, saque, transferencia e transacao.
- [ ] Mascara de data ainda nao implementada.
- [x] Responsividade basica implementada.
- [~] Responsividade completa para celular em aprimoramento.
- [x] Menu mobile implementado com botao, overlay e fechamento ao clicar nos links.
- [ ] Leitura por camera de QR Code ainda nao implementada.
- [ ] Leitura por camera de codigo de barras ainda nao implementada.
- [x] Botao mostrar/ocultar senha.
- [~] Sidebar aprimorada parcialmente com comportamento mobile.
- [x] Resumo da conta no topo implementado.
- [x] Tela minha conta ajustada.
- [x] Tela meus dados ajustada.
- [x] Tela de empresas.
- [x] Tela de dashboard PJ.
- [x] Tela de conta empresarial.
- [x] Tela de pagamentos PJ.
- [x] Tela de extrato PJ.
- [x] Tela de cartoes PJ.
- [x] Historico de comprovantes PJ.
- [x] Login empresarial pelo frontend.
- [x] Empresa logada salva no `localStorage`.
- [x] Sidebar separada para area PJ.
- [x] Tela de comprovante da ultima operacao.
- [x] Tela de historico de comprovantes.
- [x] Comprovante exibindo pagador.
- [x] Comprovante com destino dinamico por metodo.
- [x] Metodo do comprovante exibido como selo visual.
- [x] Comprovante individual carregado pelo backend usando ID.
- [~] Dashboard conectado aos dados principais.
- [x] Tela de pagamentos.
- [x] Historico visual de pagamentos em `pagamentos.html`.
- [x] Tela de cartoes.
- [x] Criacao de cartao pelo frontend.
- [x] Consulta de cartao pelo frontend.
- [x] Registro de compras no cartao pelo frontend.
- [x] Listagem de compras do cartao pelo frontend.
- [x] Tela de investimentos.

### 13.3 Funcionalidades Pendentes

- [~] Proteger telas usando usuario logado.
- [~] Usar usuario logado para preencher telas sem digitar ID.
- [ ] Resetar banco H2 para limpar dados de teste baguncados.
- [x] Adicionar horario nas transferencias e movimentacoes.
- [x] Criar aba de pagamentos.
- [x] Pagamento de boleto ficticio.
- [ ] Pix por QR Code.
- [ ] Camera no celular para ler QR Code.
- [ ] Camera no celular para ler codigo de barras.
- [~] Responsividade completa para celular.
- [x] Gerar comprovante de pagamento por transferencia, Pix e boleto.
- [x] Gerar comprovante visual de transferencia.
- [x] Salvar comprovantes de pagamentos no banco.
- [x] Historico real de comprovantes por conta.
- [x] Comprovante com pagador e destino dinamico.
- [x] Botao para ver comprovante no historico de pagamentos.
- [x] Botao para imprimir comprovante.
- [ ] Botao para baixar comprovante em PDF.
- [x] Conta de empresa com CNPJ.
- [x] Cadastro de empresa.
- [x] Diferenciar conta pessoa fisica e conta empresa.
- [x] Login empresarial.
- [x] Dashboard PJ.
- [x] Tela de conta empresarial.
- [x] Pagamentos PJ.
- [x] Extrato PJ.
- [x] Cartoes PJ.
- [x] Comprovantes PJ.
- [x] Arrumar tela minha conta.
- [x] Arrumar tela meus dados.
- [x] Pix por chave Pix.
- [x] Pix por telefone.
- [x] Gerar chave Pix aleatoria.
- [x] Adicionar telefone no cadastro.
- [~] Aprimorar criacao de usuario.
- [~] Aprimorar criacao de conta.
- [ ] Melhorar estilo visual geral.
- [~] Melhorar sidebar.
- [x] Mostrar resumo da conta no topo.
- [ ] Login com conta Google.
- [x] Separacao basica entre cliente, empresa e administracao no frontend.
- [x] Cartoes implementado com criacao, compras, fatura e pagamento.
- [x] Tela de cartoes implementada.
- [x] Criacao e consulta de cartao pelo frontend.
- [x] Compras no cartao implementadas.
- [x] Listagem de compras do cartao pelo frontend.
- [x] Fatura.
- [x] Metas financeiras.
- [~] Relatorios com Python.
- [x] Graficos.
- [x] Investimentos ficticios iniciais.
- [x] Resgate de investimentos.
- [x] Integracao inicial com API do Banco Central para indicadores de investimentos.
- [ ] Integracao futura com API da B3 para modulo de investimentos.
- [ ] Integracao futura com API de acoes e fundos imobiliarios.
- [ ] Exportacao de relatorios.
- [x] Filtros no extrato por data, tipo e categoria implementados no frontend.
- [x] Filtros avancados do extrato implementados no backend.

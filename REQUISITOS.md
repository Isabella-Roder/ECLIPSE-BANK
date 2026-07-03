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
- Gerar comprovantes de pagamento e transferencia futuramente.
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
- [ ] Horario das movimentacoes ainda nao implementado.
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
- [ ] Busca por chave Pix ainda não implementada.
- [ ] Pix por telefone ainda não implementado.
- [ ] Chave Pix aleatoria ainda não implementada.
- [ ] Botao para gerar chave Pix aleatoria ainda não implementado.
- [ ] Pagamento de boleto ainda não implementado.

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
- [ ] Filtro por data ainda não implementado.
- [ ] Filtro por mês ainda não implementado.
- [ ] Filtro avançado por categoria no extrato da conta ainda não implementado.

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
- [ ] Tela `pagamentos.html` ainda nao implementada.
- [ ] Pix por chave Pix ainda nao implementado.
- [ ] Pix por telefone ainda nao implementado.
- [ ] Pagamento de boleto ficticio ainda nao implementado.
- [ ] Historico de pagamentos ainda nao implementado como tela propria.
- [ ] Comprovante de pagamento ainda nao implementado.
- [ ] Comprovante de transferencia ainda nao implementado.

Metodos de pagamento previstos:

- Transferencia por numero da conta.
- Pix por chave Pix.
- Pix por telefone.
- Boleto ficticio.
- Outros metodos de pagamento futuramente.

Requisitos:

- Permitir que o cliente escolha o metodo de pagamento.
- Validar saldo antes de concluir qualquer pagamento.
- Registrar pagamentos no extrato.
- Registrar data e horario do pagamento.
- Permitir pagamento de boleto ficticio com codigo digitado.
- Permitir Pix usando chave Pix cadastrada.
- Permitir Pix usando telefone cadastrado como chave Pix.
- Gerar comprovante apos pagamento aprovado.
- Gerar comprovante apos transferencia aprovada.
- Permitir visualizar ou baixar comprovante futuramente.

### 3.11 Conta Empresa

O sistema deve permitir futuramente a criacao de contas para empresas, usando CNPJ.

Status atual:

- [ ] Conta empresa ainda nao implementada.
- [ ] Cadastro de empresa ainda nao implementado.
- [ ] CNPJ ainda nao implementado.
- [ ] Separacao entre conta pessoa fisica e conta empresa ainda nao implementada.

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

O sistema deve considerar dois tipos principais de uso: cliente e administracao.

Status atual:

- [~] Telas de cliente começaram a ser separadas.
- [x] Tela `dados.html` criada para dados pessoais.
- [x] Tela `minha-conta.html` criada para dados da conta.
- [x] Tela `transferencias.html` criada para transferência entre contas.
- [~] Telas administrativas existem, mas ainda sem controle de permissão.
- [x] Login simples implementado.
- [~] Login controla acesso de algumas telas do cliente.
- [x] Logout implementado no menu lateral.
- [ ] Login com conta Google ainda não implementado.
- [ ] Separação real entre cliente e administração ainda não implementada.

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
- [ ] `pagamentos.html` ainda não implementado.
- [ ] Tela de empresas ainda não implementada.
- [ ] Tela de comprovantes ainda não implementada.
- [ ] Tela de relatórios ainda não implementada.
- [ ] Tela de investimentos ainda não implementada.

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
- `empresas.html`: cadastro e gestao de empresas futuramente.
- `comprovantes.html`: consulta de comprovantes futuramente.

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
- Exibir telefone futuramente.
- Melhorar layout e organizacao das informacoes.
- Exibir tipo de cliente futuramente.
- Permitir futura edicao de dados cadastrais.

### 11.3 Minha Conta

Requisitos:

- Consultar saldo.
- Consultar numero da conta.
- Consultar chave Pix.
- Consultar limite.
- Melhorar layout e organizacao das informacoes.
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
- Permitir pagamento de boleto ficticio.
- Gerar comprovante de pagamento.
- Gerar comprovante de transferencia.
- Exibir mensagem de sucesso ou erro.
- Usar a conta do usuario logado como origem do pagamento.

### 11.6 Empresas

Requisitos:

- Cadastrar empresa.
- Listar empresas.
- Criar conta para empresa.
- Exibir CNPJ, razao social e nome fantasia.
- Separar conta empresa de conta pessoa fisica.

## 12. Investimentos

O sistema deve possuir uma area de investimentos ficticios para complementar o controle financeiro do Eclipse Bank.

Status atual:

- [ ] Módulo de investimentos ainda não implementado.
- [ ] Tela de investimentos ainda não implementada.
- [ ] Simulador de investimentos ainda não implementado.
- [ ] Integração com API da B3 ainda não implementada.
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

### 12.3 Funcionalidades de Investimento

Requisitos:

- Simular investimento.
- Aplicar valor ficticio.
- Resgatar valor ficticio.
- Acompanhar rendimento.
- Listar historico de aplicacoes.
- Exibir grafico de evolucao.
- Integrar futuramente com API da B3 para consultar dados de mercado, quando a etapa de investimentos for iniciada.
- Usar dados da B3 apenas como referencia informativa, mantendo as operacoes do Eclipse Bank como ficticias/simuladas.

### 12.4 Dashboard de Investimentos

Requisitos:

- Exibir total investido.
- Exibir rendimento total.
- Exibir rendimento do mes.
- Exibir investimentos por tipo.
- Exibir cotacoes ou indicadores obtidos via API da B3 futuramente.
- Integrar dados com relatorios em Python futuramente.

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
- [ ] Telefone ainda nao implementado no usuario.
- [ ] Empresa ainda nao implementada.
- [ ] CNPJ ainda nao implementado.
- [ ] Conta empresa ainda nao implementada.
- [ ] Mascara de CPF ainda nao implementada.
- [ ] Mascara de telefone ainda nao implementada.
- [ ] Confirmacao de senha ainda nao implementada.
- [ ] Botao mostrar/ocultar senha ainda nao implementado.
- [x] Cadastro de contas para usuarios.
- [x] Listagem de contas.
- [x] Saldo, limite, numero e chave Pix na conta.
- [ ] Telefone como chave Pix ainda nao implementado.
- [ ] Geracao de chave Pix aleatoria ainda nao implementada.
- [ ] Numero da conta automatico ainda nao implementado.
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
- [x] Busca de conta por ID.
- [x] Busca de usuario por ID.
- [x] Login simples por email e senha.
- [x] Logout pelo frontend.
- [x] Busca de conta por usuario logado.
- [x] Transferencia por numero da conta.
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
- [x] Tela de transferencias.
- [x] Transferencia entre contas pelo HTML.
- [x] Tela minha conta.
- [x] Consulta de dados da conta pelo HTML.
- [x] Tela de dados do cliente.
- [x] Consulta de dados do usuario pelo HTML.
- [x] Tela de login.
- [x] Login pelo HTML.
- [x] Usuario logado salvo no `localStorage`.
- [x] Logout pelo menu lateral.
- [x] Tela de dados usando usuario logado.
- [x] Tela minha conta usando usuario logado.
- [x] Tela de extrato usando usuario logado.
- [x] Tela de transferencias usando conta do usuario logado como origem.
- [x] Transferencia por numero da conta pelo HTML.
- [ ] Mascaras de CPF, telefone, data, dinheiro e valor.
- [ ] Botao mostrar/ocultar senha.
- [ ] Sidebar ainda precisa ser aprimorada visualmente.
- [ ] Resumo da conta no canto direito superior ainda nao implementado.
- [ ] Tela minha conta precisa ser ajustada.
- [ ] Tela meus dados precisa ser ajustada.
- [ ] Tela de empresas.
- [ ] Tela de comprovantes.
- [~] Dashboard conectado aos dados principais.
- [ ] Tela de pagamentos.
- [ ] Tela de investimentos.

### 13.3 Funcionalidades Pendentes

- [~] Proteger telas usando usuario logado.
- [~] Usar usuario logado para preencher telas sem digitar ID.
- [ ] Resetar banco H2 para limpar dados de teste baguncados.
- [ ] Adicionar horario nas transferencias e movimentacoes.
- [ ] Criar aba de pagamentos.
- [ ] Pagamento de boleto ficticio.
- [ ] Gerar comprovante de pagamento.
- [ ] Gerar comprovante de transferencia.
- [ ] Conta de empresa com CNPJ.
- [ ] Cadastro de empresa.
- [ ] Diferenciar conta pessoa fisica e conta empresa.
- [ ] Arrumar tela minha conta.
- [ ] Arrumar tela meus dados.
- [ ] Pix por chave Pix.
- [ ] Pix por telefone.
- [ ] Gerar chave Pix aleatoria.
- [ ] Adicionar telefone no cadastro.
- [ ] Aprimorar criacao de usuario.
- [ ] Aprimorar criacao de conta.
- [ ] Melhorar estilo visual geral.
- [ ] Melhorar sidebar.
- [ ] Mostrar resumo da conta no canto direito superior.
- [ ] Login com conta Google.
- [ ] Separacao real entre cliente e administracao.
- [ ] Cartoes.
- [ ] Fatura.
- [ ] Metas financeiras.
- [ ] Relatorios com Python.
- [ ] Graficos.
- [ ] Investimentos ficticios.
- [ ] Integracao futura com API da B3 para modulo de investimentos.
- [ ] Exportacao de relatorios.
- [ ] Filtros avancados no extrato por data, tipo e categoria.

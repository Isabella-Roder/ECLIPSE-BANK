# Eclipse Bank - Requisitos do Sistema

## 1. Visão Geral

O **Eclipse Bank** é um sistema bancário fictício com foco em controle financeiro pessoal. A aplicação deve permitir que o usuário controle sua conta, acompanhe receitas e despesas, visualize um dashboard financeiro, gerencie cartões, metas e relatórios.

O projeto será desenvolvido usando duas linguagens:

- **Java**: sistema principal, regras bancárias, usuários, contas, transações, cartões e API.
- **Python**: análise financeira, geração de relatórios, gráficos, indicadores e processamento de dados.

## 2. Objetivos

- Criar uma conta bancária fictícia para cada usuário.
- Permitir controle de saldo, entradas, saídas e transferências.
- Exibir um dashboard com informações financeiras importantes.
- Registrar receitas, despesas, depósitos, saques e pagamentos.
- Gerenciar categorias de gastos.
- Controlar cartão de crédito, compras e faturas.
- Criar metas financeiras.
- Gerar relatórios com gráficos e resumo mensal.

## 3. Módulos do Sistema

### 3.1 Conta do Usuário

O sistema deve permitir que o usuário tenha uma conta própria no Eclipse Bank.

Requisitos:

- Cadastrar usuário.
- Fazer login.
- Consultar dados da conta.
- Consultar saldo atual.
- Ter uma conta corrente vinculada ao usuário.
- Ter uma chave Pix fictícia.

### 3.2 Dashboard Financeiro

O dashboard deve apresentar um resumo da vida financeira do usuário.

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

Tipos de lançamentos:

- Receita.
- Despesa.
- Transferência.
- Pagamento.
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

Funcionalidades:

- Conta corrente.
- Chave Pix fictícia.
- Transferência entre usuários.
- Depósito.
- Saque.
- Pagamento.
- Validação de saldo.
- Limite da conta.

Requisitos:

- Não permitir transações que deixem o saldo inválido, exceto se houver limite disponível.
- Registrar toda movimentação no extrato.
- Permitir transferência entre contas de usuários cadastrados.
- Permitir busca de usuário por chave Pix fictícia.

### 3.6 Extrato

O extrato deve listar todas as movimentações da conta.

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
- Cartão de crédito.
- Fatura.
- Metas financeiras.
- Relatórios com Python.
- Gráficos.

## 7. Entidades Principais

Entidades sugeridas para o sistema:

- Usuário.
- Conta.
- Transação.
- Categoria.
- Cartão.
- CompraCartão.
- Fatura.
- MetaFinanceira.
- Relatório.

## 8. Regras de Negócio

- Toda movimentação deve ser registrada no extrato.
- Despesas, saques, pagamentos e transferências devem validar saldo.
- Transferência só pode acontecer entre usuários existentes.
- Compras no cartão devem validar limite disponível.
- Pagamento de fatura deve diminuir o saldo da conta.
- Receitas e depósitos devem aumentar o saldo.
- Despesas, saques e pagamentos devem diminuir o saldo.
- O dashboard deve considerar os dados do mês atual.

## 9. Ideias Futuras

- Notificações de gastos altos.
- Alerta quando a fatura estiver perto do vencimento.
- Planejamento mensal.
- Exportação de relatórios em PDF.
- Modo administrador.
- Simulador de investimentos.
- Recomendação automática de economia usando Python.

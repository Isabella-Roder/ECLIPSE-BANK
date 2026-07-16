# Proximos Projetos

Ideias para depois do Eclipse Bank.

## 1. Sistema de gestao empresarial completo

Sistema tipo ERP/SaaS para pequenas e medias empresas, com foco em controle operacional, financeiro, vendas, estoque, dashboards e relatorios.

### Arquitetura desejada

- **Spring Boot**: backend principal, API REST, regras de negocio, banco de dados, autenticacao e permissoes.
- **Flask**: frontend web/renderizacao de telas administrativas, dashboards e relatorios.
- **Python analytics**: processamento financeiro, graficos, indicadores, exportacoes e possiveis recomendacoes.
- **Banco de dados**: PostgreSQL ou MySQL.

### Modulos principais

- Empresas/organizacoes.
- Usuarios por empresa.
- Perfis e permissoes.
- Clientes.
- Fornecedores.
- Produtos e servicos.
- Estoque.
- Vendas.
- Compras.
- Contas a pagar.
- Contas a receber.
- Fluxo de caixa.
- Dashboard gerencial.
- Relatorios financeiros.
- Exportacao CSV/PDF.
- Auditoria de acoes importantes.

### MVP sugerido

- Cadastro de empresa.
- Login de usuario.
- Controle de permissoes basico.
- Cadastro de clientes.
- Cadastro de fornecedores.
- Cadastro de produtos.
- Entrada e saida de estoque.
- Registro de vendas.
- Registro de contas a pagar e receber.
- Dashboard com faturamento, despesas, lucro estimado e contas vencidas.
- Relatorios em Flask/Python consumindo dados do Spring Boot.

### Diferenciais para portfolio

- Arquitetura com dois backends trabalhando juntos.
- Spring Boot como API robusta.
- Flask como camada web analitica.
- Regras de negocio mais empresariais.
- Banco relacional mais proximo do mercado.
- Permissoes por papel.
- Dashboards e relatorios reais.
- Possibilidade de deploy separado.

### Nome possivel

- Nexus ERP
- Atlas Manager
- Aurora Gestão
- Eclipse Suite
- CoreFlow

### Por que fazer

Projeto grande, empresarial e forte para portfolio. Ele aproveita o que foi aprendido com Eclipse Bank, mas sobe o nivel: mais entidades, permissoes, relatorios, arquitetura, dashboards, regras de negocio e integracao entre Java e Python.

## 2. Sistema de gestao hospitalar

Sistema para clinica, consultorio ou hospital ficticio.

Modulos possiveis:

- pacientes
- medicos
- consultas
- exames
- prontuario
- internacao
- convenios
- farmacia
- agenda
- relatorios
- usuarios e permissoes

Por que fazer:

Projeto complexo, com muitos perfis, historico de atendimentos, agenda e dados sensiveis. Bom para mostrar maturidade em regras de negocio.

## 3. Plataforma de ensino

Sistema parecido com um mini Moodle.

Modulos possiveis:

- cursos
- aulas
- alunos
- professores
- matriculas
- exercicios
- notas
- certificados
- progresso do aluno
- area do professor
- area do aluno

Por que fazer:

Bom para praticar conteudo, permissoes, progresso, avaliacoes e organizacao de usuarios por papel.

## Recomendacao atual

Depois do Eclipse Bank, o projeto mais forte para continuar evoluindo seria o ERP para pequenas empresas.

Ele aproveita o que ja foi aprendido com banco, usuario, pagamentos, dashboard e regras de negocio, mas aumenta bastante o nivel de arquitetura.

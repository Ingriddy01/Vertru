# 📋 Desafio Técnico: Cadastro de Usuário em Abas (Angular + PrimeNG)

Este repositório contém a solução do desafio técnico para desenvolvimento Frontend, focado na criação de um formulário de cadastro de usuários segmentado em duas etapas (Abas), integrado à API pública do ViaCEP para autopreenenchimento de endereços.

O projeto foi estruturado seguindo as melhores práticas do ecossistema Angular moderno, focando em componentização, reatividade e testes automatizados.

---

## 🚀 Funcionalidades Implementadas

*   **Formulário Reativo Segmentado:** Fluxo dividido em duas abas (`Dados Pessoais` e `Endereço`) utilizando o componente `p-tabView` do PrimeNG.
*   **Validação em Tempo Real:** Bloqueio de navegação caso haja campos inválidos, com feedbacks visuais claros e mensagens de erro descritivas (`p-toast` e `p-error`).
*   **Integração com API ViaCEP:** Autopreenchimento assíncrono dos campos de Logradouro, Bairro e Estado assim que o usuário digita um CEP válido (evento `blur`).
*   **Campos de Endereço Inteligentes:** Bloqueio de campos retornados pela API (como Rua e Estado) para evitar inconsistência de dados pelo usuário, mantendo ativos apenas os campos editáveis (Número e Complemento).
*   **Gerenciamento de Estado:** Utilização de `BehaviorSubject` para armazenar de forma segura o estado do usuário de forma global na aplicação.
*   **Modal de Confirmação:** Exibição de um resumo estruturado de todos os dados salvos em um componente `p-dialog` após o envio do formulário.

---

## 📁 Estrutura de Arquivos Entregue

A entrega foca na lógica central e nos componentes criados para o desafio, organizados sob a arquitetura recomendada do Angular:

```text
src/app/
│
├── models/
│   └── user.model.ts              # Interfaces e tipagens (TypeScript)
│
├── services/
│   ├── cep.service.ts             # Integração HTTP com a API ViaCEP
│   └── user.service.ts            # Gerenciamento de estado dos dados salvos
│
└── components/
    └── user-form/
        ├── user-form.component.ts    # Lógica do componente (Standalone)
        ├── user-form.component.html  # Interface estrutural (HTML)
        ├── user-form.component.css   # Estilização e Grid Layout (CSS)
        └── user-form.component.spec.ts # Testes unitários do formulário
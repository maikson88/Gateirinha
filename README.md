# Gateirinha — Instruções de Instalação 🐱

Parabéns! Você acaba de gerar o código fonte da **Gateirinha**. Siga os passos abaixo para rodar o projeto no seu computador.

---

## Pré-requisitos

Você precisa ter o **Node.js** instalado no seu computador. Se não tiver, baixe em: https://nodejs.org

> **Obs.:** Você também vai precisar do **Python** para executar o script `gerador_gateirinha.py`.

---

## Passo a Passo

### 1) Execute o Script Python

Para garantir que funcione e você veja o resultado:

1. Abra o terminal na pasta onde você salvou o arquivo `gerador_gateirinha.py`.
2. Digite o comando abaixo e aperte **Enter**:

```bash
python gerador_gateirinha.py
```

Isso criará uma pasta chamada `gateirinha-app`.

**Nota:** Se você apenas clicar duas vezes no arquivo, ele pode rodar e fechar a janela instantaneamente. Verifique se a pasta `gateirinha-app` apareceu.

---

### 2) Abra o Terminal na Pasta do Projeto

Entre na pasta que acabou de ser criada:

```bash
cd gateirinha-app
```

---

### 3) Instale as Dependências

Execute o comando abaixo para baixar as bibliotecas necessárias (React, Tailwind, etc). Isso pode levar alguns minutos:

```bash
npm install
```

---

### 4) Rode o Projeto

Agora, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O terminal vai mostrar um link (geralmente `http://localhost:5173/`). Clique nele ou copie e cole no seu navegador.

---

## Solução de Problemas Comuns

### O comando `python` não é reconhecido
- Tente usar:
  - `python3 gerador_gateirinha.py`
  - `py gerador_gateirinha.py`
- Verifique se o **Python** está instalado e adicionado ao **PATH** do sistema.

### Script "não faz nada"
- Verifique se a pasta `gateirinha-app` foi criada no mesmo local onde está o script.
- Tente rodar pelo terminal (Passo a Passo → Etapa 1) para ver se aparece alguma mensagem de erro.

### Erro "`npm` não reconhecido"
- Instale o **Node.js**.

### A página abriu em branco
- Verifique se o terminal não mostrou nenhum erro.

---

Divirta-se criando RGs para seus gatinhos! 🐾


---

---

## Deploy no Azure App Service (Windows) via VS Code

Quando o deploy é feito direto pelo VS Code (Zip Deploy), o problema mais comum da “página carregar sem renderizar” é: **o build do Vite não rodou no servidor**.

Para funcionar de forma consistente:

1. Configure o **Startup Command** do App Service para:
```bash
npm start
```

2. No App Service, adicione/garanta estes **Application Settings**:
- `SCM_DO_BUILD_DURING_DEPLOYMENT=true`
- `WEBSITE_NODE_DEFAULT_VERSION=~20` (ou versão Node compatível com seu projeto)

3. Faça o deploy novamente pelo VS Code.

4. Confira nos logs do deployment se houve:
- `npm install`
- `npm run build`

> Este projeto já está preparado para isso com:
> - `postinstall` executando `npm run build`
> - `start` executando `node server.js`
> - fallback SPA no `server.js` para rotas do React.


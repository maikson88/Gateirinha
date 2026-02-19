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

Sim — e para deixar o deploy **rápido**, o ideal é publicar somente o build pronto (`dist`).

### Estratégia recomendada (deploy rápido)
1. Gere o build localmente:
```bash
npm run build
```

2. No App Service (Configuration > General settings), use Startup Command:
```bash
node server.js
```

3. Em Application Settings, deixe:
- `SCM_DO_BUILD_DURING_DEPLOYMENT=false` (evita build no servidor e acelera deploy)
- `WEBSITE_NODE_DEFAULT_VERSION=~20`

4. Faça deploy pelo VS Code com `.webappignore` (já incluído neste repo) para enviar só o necessário:
- `dist/**`
- `server.js`
- `web.config`
- `package.json` / `package-lock.json`

### Sobre `web.config`
- Em Windows App Service, ele continua útil como fallback para IIS encaminhar requisições ao Node (`server.js`).
- Mesmo com Startup Command, manter `web.config` ajuda a evitar variações de ambiente no deploy via VS Code.

### Resultado esperado
- Deploy bem mais rápido (sem `npm install`/`vite build` no servidor).
- App servindo apenas artefatos de produção de `dist`.


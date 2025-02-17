# Gerador de Identidade Animal

Este projeto é um gerador de carteiras de identidade para animais de estimação. Ele permite que o usuário insira informações sobre o pet, como nome, raça, data de nascimento, gênero, cor, e o nome do proprietário, além de fazer o upload de uma foto. Após preencher os dados, o usuário pode gerar uma versão digital da identidade do pet em formato PDF, pronta para ser salva ou compartilhada.

## Funcionalidades

- Cadastro de informações do pet:
  - Nome
  - Raça
  - Data de nascimento
  - Gênero
  - Cor
  - Nome do proprietário
  - Número de registro único
  
- Upload de foto do pet para gerar a identidade com a imagem.
- Geração de um PDF com as informações do pet, pronto para ser baixado.
- Layout responsivo e visualmente agradável para exibir as informações do pet e a foto.

## Como Usar

### Passo 1: Preencher as informações do pet
Insira os dados do seu pet nos campos disponíveis no formulário. As informações incluem nome, raça, data de nascimento, gênero, cor e o nome do proprietário.

### Passo 2: Fazer o upload da foto do pet
Clique no ícone de câmera para selecionar uma foto do seu pet. A foto será ajustada para se ajustar ao tamanho da identidade.

### Passo 3: Gerar a identidade
Depois de preencher todas as informações, clique no botão "Gerar Carteira Digital" para baixar a identidade do seu pet em formato PDF.

## Instalação

### Requisitos

Antes de começar, verifique se você tem os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://npmjs.com) ou [Yarn](https://yarnpkg.com/)

### Passo 1: Clonar o repositório

Clone este repositório para o seu computador:

```bash
git clone https://github.com/SEU-USERNAME/gerador-identidade-animal.git
```

### Passo 2: Instalar as dependências

Entre na pasta do projeto e instale as dependências:

```bash
cd gerador-identidade-animal
npm install
```

Ou, se preferir o Yarn:

```bash
yarn install
```

### Passo 3: Rodar o projeto

Execute o projeto localmente:

```bash
npm start
```

Ou, se estiver usando Yarn:

```bash
yarn start
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

### Passo 4: Acessar a aplicação

Depois de executar o projeto, abra seu navegador e acesse [http://localhost:3000](http://localhost:3000). A interface permitirá que você insira as informações do seu pet, faça o upload da foto e gere a identidade.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **html2pdf.js**: Biblioteca para gerar arquivos PDF a partir de HTML.
- **Lucide Icons**: Conjunto de ícones usados para ilustrar a interface.
- **TailwindCSS**: Framework de CSS para design responsivo e estilização rápida.

## Contribuição

Se você quiser contribuir com o projeto, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para a sua modificação (`git checkout -b minha-modificacao`).
3. Faça as modificações desejadas.
4. Envie um pull request.

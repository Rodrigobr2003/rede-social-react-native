# Orbee

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

**Orbee** é um aplicativo inspirado no Facebook, onde é possível criar uma conta, fazer amigos, conversar em tempo real, postar fotos e muito mais. A versão mobile foi construída com **React Native**, utilizando **TypeScript** e **Node.js** no back-end, e **MongoDB** como banco de dados.

## Descrição

O **Orbee** proporciona uma experiência de rede social intuitiva e moderna. Ele permite que os usuários:

- Criem suas contas.
- Adicionem e interajam com amigos.
- Troquem mensagens em tempo real.
- Postem fotos e compartilhem conteúdo com a comunidade.

Com uma interface amigável e funcionalidades robustas, o Orbee traz uma experiência de usuário semelhante à de outras redes sociais, com foco na simplicidade e no desempenho.

---

## Instruções de Instalação

### Pré-requisitos

Antes de começar, verifique se você tem os seguintes softwares instalados:

- [Node.js](https://nodejs.org/en/) - Versão 14.x ou superior.
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (opcional, mas recomendado).
- [MongoDB](https://www.mongodb.com/try/download/community) para o banco de dados local (ou use uma instância na nuvem).
- [React Native CLI](https://reactnative.dev/docs/environment-setup).

### Configuração do Ambiente
Para que o projeto funcione corretamente, é necessário criar um arquivo  ```.env``` na raiz do diretório  ```backend```, contendo as seguintes variáveis de ambiente:

   ```bash
   CONNECTION=<sua_connection_string_do_mongodb>
   SECRETKEY=<sua_senha_secreta_para_sessoes>
   ```
- **CONNECTION:** Insira a connection string do seu banco de dados MongoDB.
- **SECRETKEY:** Defina uma chave secreta para gerenciar as sessões de autenticação.

  **Importante:** Nunca compartilhe suas credenciais reais publicamente.

### Etapas

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/seu-usuario/orbee.git
   ```

2. **Instale todos os pacotes:**

   ```bash
   cd frontend

   npm install

   cd ..

   cd backend
   
   npm install

   cd ..
   ```

3. **Execute o diretório backend:**

   ```bash
   cd backend

   npm start
   ```

4. **Execute o diretório frontend:**

   ```bash
   cd frontend

   npm start
   ```

  - Selecione a opção "Press a │ open Android", para emular o App em seu computador!
  - Ou leia o QR Code disponível no terminal!

# ebyrt-to-do-list
Boas vindas ao To Do List da empresa Ebyrt, onde você pode adicionar tarefas e classificá-las para organizar seu dia-a-dia.

## Observações:

Este é o repositório do frontend da aplicação. Para acessar o do **backend**, clique neste link: https://github.com/DanielDaher/ebyrt-to-do-list-backend

## Objetivos:

O objetivo do projeto é facilitar a organização dos afazeres de todas as pessoas colaboradoras da empresa Ebyrt.

## Para acessar o link da aplicação:
[ebyrt-to-do-list] (https://ebyrt-to-do-list-danieldaher.vercel.app/)

## Como rodar a aplicação no computador:

#### Seu computador precisa de Git (para versionamento do código), Node.js & npm (para executar a aplicação) e MongoDB (que será nosso banco de dados). Clique nos links, caso ainda não tenha instalado algum desses:

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 - [ ] [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [ ] [MongoDB](https://docs.mongodb.com/manual/installation/)

- O **MongoDB** precisa estar ativo para que a aplicação funcione. Digite o seguinte comando no terminal, para verificar isso:
`sudo service mongod status`.

  Caso a propriedade **Active** não esteja como *Active(running)* digite no terminal `sudo service mongod start`. Talvez o sistema te peça sua senha de usuário. Basta digitar, sabendo que os caracteres de senha não aparecem no terminal.

Agora sim estamos prontos para instalar o projeto.

## Instalando a aplicação:

1. Primeiro, abra um novo terminal e clone o repositório do frontend utilizando o comando 
`git clone git@github.com:DanielDaher/ebyrt-to-do-list-frontend.git`

2. Clone também o repositório do backend utilizando o comando
`git clone git@github.com:DanielDaher/ebyrt-to-do-list-backend.git`

3. Em seguida, digite `cd ebyrt-to-do-list-backend` para entrar no diretório (pasta) do projeto, que acabou de ser criada. É preciso executar o comando `npm install` para instalar as dependências necessárias.

4. Com o comando `npm run dev`, o backend da aplicação já estará funcionando. Aguarde alguns segundos, que o terminal mostrará a mensagem "App listening on PORT 3000", o que significa que está tudo certo. Lembrando que, para executar este passo é necessário que seu **MongoDB** esteja ativo.

5. Abra outro terminal (para não interromper o backend, que deve continuar rodando) e acesse a pasta do projeto novamente.

6. Agora, ao invés de entrar na pasta do backend, vamos para o frontend com `cd ebyrt-to-do-list-frontend`.

7. Instale mais dependências com `npm install`

8. Ao término da etapa anterior, rode no terminal `npm start`. Isto pode demorar alguns minutos, aguarde até que o terminal te pergunte se deseja abrir a porta **3001**, pois a 3000 já está executando o backend. Basta teclar **y** ou **yes** e apertar enter. Em alguns instantes seu navegador principal abrirá a aplicação com um link local. 

9. E agora é só desfrutar do site!


## Funcionalidades da aplicação

A aplicação está em inglês, mas basta pedir para que o navegador traduza que continuará funcionando perfeitamente.

A primeira tela é um formulário para fazer login, ou ir para a página de cadastro. Basta escolher um nome de usuário (não precisa ser um email) e uma senha minimamente segura. Após o cadastro, volte para a página inicial.

Feito o login, a aplicação entra em uma página de tarefas, onde é possível criar novas tarefas, editá-las, classificá-las por status e removê-las.

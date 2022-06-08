# React, Material UI 5 e Typescript

Este projeto foi iniciado com [Create React App](https://github.com/facebook/create-react-app).

## Desenvolvimento do projeto
Este projeto foi desenvolvido acompanhando as playlists de cursos do canal [Lucas Sousa Dev](https://www.youtube.com/c/LucasSouzaDev)

 - [Branch curso básico](https://github.com/andresinho20049/Curso-de-React/tree/curso_basico)
 - [Branch curso Material UI 5](https://github.com/andresinho20049/Curso-de-React/tree/curso_mui)

## Minhas impressões
 - Achei muito simples desenvolver com React
 - Desenvolver app Node.js com Typescript tem uma abordagem de desenvolvimento diferente de aplicações Web Vanilla(HTML, CSS e JS)
  - Material UI simplifica muito o desenvolvimento e com poucas linhas de código é possivel chegar em resultado incriveis.

  ### Referente o curso, gostei bastante por dois principais motivos.
   - Dicas e preocupação com organização de código, código clean code, em resumo, foi dado atenção as boas práticas e dado dicas de como organizar um projeto React
   - Explicação dos porques e como em cada processo do desenvolvimento.

## Como iniciar o projeto
1. Baixe o projeto, executando um git clone
```git
git clone https://github.com/andresinho20049/Biblioteca_PHP_Parent.git
```

2. Dentro da pasta do projeto digite:
```node
npm run start
# or
yarn start
```
> **Obs:**  
Para executar esse projeto você ira precisar ter o Node instalado na sua maquina.

3. E tambem é preciso da start no Json Server:
```
npm run mock
# or
json-server -w ./mock/db.json -p 4000
```

4. Após instalado as dependencias do projeto e gerado o build o mesmo será aberto no seu navegador na url: [http://localhost:3000/](http://localhost:3000/)

5. Na tela de login, logar com:     
*Usuário*: admin@admin.com  
*Senha*: 1234

## Bibliotecas utilizadas
Irei abordar um pouco sobre as ferramentas/bibliotecas utilizadas, o porque foram desenvolvidas de tal maneiras, principalmente os pontos que foram desenvolvidos diferente da abordagem utilizada no curso.
### Material UI 5 
Material UI é uma biblioteca de componentes React UI que implementa o Material Design do Google.
### Axios
Axios é um cliente HTTP baseado em Promises para fazer requisições. O Axios traz algumas vantagens e simplificações, sendo melhor utilza-lo do que apenas o Fetch, como configuração simples, conversão automática do JSON, Interceptores, etc...
### Unform
Unform, API de formulários, vantagem em utilizar por não usa state, aí quando é digitado na input as outras inputs  não sofrem render.

### Yup
Yup é um construtor de esquema JavaScript para análise e validação de valor.

### Bcrypt
Bcrypt otimizado em JavaScript com zero dependências. Compatível com a ligação bcrypt C++ em node.js e também funcionando no navegador. Utilizado nesse projeto para salvar uma senha criptografada e compara o hash no service de login.

### Js-Cookie
Uma API JavaScript simples e leve para lidar com cookies

### Json Server
API Rest (Fake), utilizado para mock.

## Considereções
É importante enfatizar que os requisitos de segurança/autenticação dessa aplicação não são validas para um serviço em produção, num cenário de desenvolvimento real, bem provavelmente existira um serviço de back-end que fará possivelmente uma autenticação Oauth2 e retornara um token JWT.     
Essa aplicação é um desenvolvimento com vies acadêmico, e para simplificar foi utilizado Json Server, substituindo assim o "back-end", portanto desconsiderar requisitos de segunraça, o foco desse projeto é o desenvolvimento front-end com React e Material UI.

> Desenvolvedor André Carlos    
> Projeto: React, Material UI 5 e Typescript     
> Back-end: JsonServer
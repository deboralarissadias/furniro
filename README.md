# Furniro - Desafio 2

Desafio 2 - o objetivo é criar um site de uma loja de móveis para sala de visita, sala de jantar e quarto. Este desafio foi proposto pelo Estágio do Programa de Bolsas - Full Stack Development (React.js + Node.js) for Commerce on AWS - Estácio, oferecido pela Compass Uol.

O site foi desenvolvido de acordo com o figma disponibilizado pela Compass Uol.

[Link do Figma](https://www.figma.com/design/J27KrXsrg5eaRTJQM130hC/eCommerce-Website-%7C-Web-Page-Design-%7C-UI-KIT-%7C-Interior-Landing-Page-(Community)?node-id=0-1&t=CMJNaBryci4KaXSf-0)

O site é uma construção de três páginas dinâmicas de uma loja de móveis e decoração. As páginas que foram construídas são: Página Inicial, Lista de Produtos e Detalhes dos Produtos. O objetivo principal do desafio foi desenvolver o Front-End e o Back-End com React e NestJS. Também foi mecionando que não deveríamos fazer a parte responsiva das páginas. Foram utilizadas as tecnologias mencionadas abaixo.

## Tecnologias usadas no Projeto:

- **Node.js**: Plataforma utilizada para executar o ambiente de desenvolvimento JavaScript no back-end, possibilitando o uso de NestJS.
- **NestJS**: Usado para construir a API do back-end, oferecendo uma estrutura modular e escalável para gerenciar rotas, serviços e controladores.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar e gerenciar os dados dos produtos, categorias, e detalhes relacionados.
- **TypeScript**: Utilizado tanto no front-end quanto no back-end para fornecer uma tipagem estática robusta, ajudando a prevenir erros e melhorar a manutenção do código.
- **React**: Usado para o desenvolvimento do front-end, criando uma interface de usuário interativa e dinâmica que consome a API do back-end.
- **CSS3**: Utilizado para o design e estilização do front-end, garantindo uma interface visualmente atraente.


## Configuração	

Configurar o postgresql na sua máquina e criar o database `furniro_db` com o seguinte comando:

```bash
psql -U postgres
CREATE DATABASE furniro_db`;
```

## Instalação

```bash
npm run install-all
```

## Start

```bash
npm start
```

Após iniciar o servidor, baixe a collection no postman ou insomnia e execute os Posts das categorias e produtos da API.

[Colleciton do Backend](/FURNIRO%20backend.postman_collection.json)

[Json das categorias e produtos](/populator-furniro.json)




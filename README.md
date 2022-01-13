# anthorflix-api

## Como rodar o projeto
* npm install: instalar as dependências
* npm start: iniciar a aplicação

## Bugs Conhecidos
* Não encontrei

## Como você planejou abordar este projeto ? Que tecnologias foram utilizadas?
Eu não criei um plano de ação formal para este projeto. Porém eu fiz um mapa mental relacionando as dependências de cada feature e as construí por ordem de dependência.
Por exemplo: O primeiro requisito apresentado no teste é o CRUD de filmes, porém o CREATE, UPDATE e o DELETE precisam de autenticação então passei para o segundo requisito, Cadastro de usuários, e após isso fiz o Login.
Tecnologias utilizadas
* bcrypt para criptografia das senhas
* dotenv para controle das variaveis de ambiente
* jwt para autenticação de rotas sensíveis
* CORS para liberar a permissão de acesso à API
* mongoose, express e nodemon para acelerar o desenvolvimento
* jest e supertest foram instalados para testes unitários mas acabei não conseguindo fazer a tempo

## Você acha algum dos requisitos ou funcionalidades difíceis em algum aspecto? Por quê?
As funcionalidades que eu tive mais problemas para desenvolver foram "Usuários podem avaliar filmes" e "Usuários podem comentar nas avaliações de outros usuários" pois eu nunca tinha usado arrays de referencias no mongoDB

## Se você tivesse mais tempo para fazer o projeto o que faria de diferente?
* Em primeiro lugar teria efetuado os testes mais importantes
* Implementaria o CRUD de Pessoa para poder navegar entre o elenco, diretores e roteiristas como no TMDB.

<p align="center">
  <a href="https://bankme.tech/" target="blank"><img src="../assets/logo-bankme.png" width="91" height="108" alt="Bankme." /></a>
</p>
<h1 align="center">
  Aprova-me
</h1>

## Description
Teste técnico para a seleção de novos desenvolvedores da Bankme.
API feita com [NestJS](https://github.com/nestjs/nest).


<hr>
<br>

## Validação e Persistência

### Rotas:

| Método | Descrição
|---|---|
| `POST` - `/integrations/payable`  | Criação de um recebível. |
| `POST` - `/integrations/assignor`  | Criação de um cedente. |
| `GET` - `/integrations/payable`  | Listagem de todos os recebíveis. |
| `GET` - `/integrations/assignor`  | Listagem de todos os cedentes. |
| `GET` - `/integrations/payable/:id`  | Listagem de um recebível. |
| `GET` - `/integrations/assignor/:id`  | Listagem de um cedente. |


### Exemplo da estrutura um recebível:
```json
  {
    id: "33f48f73-be98-487b-8558-5e72ca6df787",
    valor: 80.0,
    emissionDate: "2023-03-03T00:00:00.000Z",
    assignorId: "6f5ea472-09ae-4f09-89be-187f6dd715ec"
  }
```

### Exemplo da estrutura um cedente:
```json
  {
    id: "6f5ea472-09ae-4f09-89be-187f6dd715ec",
    document:"12345678911",
    email: "johndoe@email.com",
    phone: "43999999999",
    name: "John Doe",
    playables: [
      {
        id: "33f48f73-be98-487b-8558-5e72ca6df787",
        valor: 80.0,
        emissionDate: "2023-03-03T00:00:00.000Z",
      }
    ]
  }
```

## Testes
Inicie o script abaixo para rodar os testes unitários
```bash
$ npm run test
```


## Autenticação:

| Método | Descrição
|---|---|
| `POST` - `/integrations/users`  |  Criação de um usuário. |
| `POST` - `/integrations/auth`  | Autenticação JWT. |

### Exemplo da estrutura um usuário:
```json
  {
    id: "d767cb09-a4ef-4a30-8a2b-71ffba2963bb",
    login:"aprovame",
    password:"aprovame",
  }
```

### Exemplo da estrutura da autenticação:
```json
  {
    access_token: "token",
  }
```

## Infra e Doc
Criando uma imagem docker para a api.

-  Dockerfile:
```docker
  FROM node:18

  WORKDIR /usr/src/app

  COPY package*.json ./

  RUN npm install

  COPY . .

  EXPOSE 3000

  RUN npm run build

  CMD [ "node", "dist/main.js" ]
```
- docker-compose.yml
```yml
version: "3.7"

services:
  app:
    build: .
    container_name: aprovame
    ports:
      - 3000:3000
    volumes:
      - .:/usr/src/app
    network_mode: host
networks:
  network:
    driver: bridge
```

### Para iniciar o container:

```bash
$ docker build --tag "aprovame-api" .
$ docker compose up -d
```

<hr>
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch
- Author - [Pedro Ferreira](https://www.linkedin.com/in/pedrolcsf/)
## License

Nest is [MIT licensed](LICENSE).

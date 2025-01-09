# CRUD de Itens com Java 17, Spring Boot, MySQL e TailwindCSS

Este é um projeto completo de um sistema de cadastro de itens (CRUD) utilizando Java 17, Spring Boot, MySQL para o back-end e TailwindCSS para o front-end.

## 📦 Funcionalidades

- ✅ Cadastro de itens (Nome, Preço e Descrição)
- ✅ Listagem de itens
- ✅ Edição de itens
- ✅ Exclusão de itens
- ✅ Integração com banco de dados MySQL
- ✅ Front-end moderno usando React e TailwindCSS

## 🛠️ Tecnologias Utilizadas

### Back-end:
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

### Front-end:
- React.js
- TailwindCSS
- Axios

## 🎯 Configuração e Execução

### Back-end:
1. Instale o MySQL e crie um banco de dados chamado `crud_items`.
2. Configure o arquivo `application.yml` no diretório `src/main/resources`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/crud_items
    username: seu_usuario
    password: sua_senha
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```
3. Execute o projeto via terminal:
```bash
mvn spring-boot:run
```

### Front-end:
1. Navegue até a pasta `frontend`.
2. Instale as dependências:
```bash
npm install
```
3. Execute o servidor de desenvolvimento:
```bash
npm start
```

## 📡 Rotas da API
- `GET /itens` → Lista todos os itens.
- `POST /itens` → Adiciona um novo item.
- `PUT /itens/{id}` → Atualiza um item existente.
- `DELETE /itens/{id}` → Remove um item.



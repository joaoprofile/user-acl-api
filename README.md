<h1 align="center">User ACL API - Access-control list</h1>

<p align="center">
  <a href="#-padrões-e-princípios">Padrões e Princípios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
</p>

## ✨ Padrões e Princípios

Esse projeto foi desenvolvido com os seguintes Pattern e Design:
- Clean architecture
- Controller
- Service
- Repository
- IoC
- Decorator

Princípios SOLID:
- Dependency inversion principle
- Single-responsibility principle

## ✨ Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [JSON Web Token](https://jwt.io/)
- [BCryptJS](https://www.npmjs.com/package/bcryptjs/)
- [Celebrate](https://github.com/arb/celebrate/)

## 🚀 Como executar

> Nesse projeto temos autenticação via OAuth normal usuário e senha, não esqueça de criar uma SECRET JWT no .env
- Clone o repositório e acesse a pasta;
- Faça uma copia do arquivo `.env.example` para `.env` e preencha com as suas credenciais e variáveis dos demais serviços.;
- Instale as dependências com `yarn`;
- Executa as migrations com `yarn prisma migrate dev`;
- Executa as seeds com `yarn prisma db seed`;
- Inicie o servidor com `yarn dev`;

A aplicação pode ser acessada em [`localhost:4000`](http://localhost:4000/).
Você vai visualizar a home da API listando os endpoints

![Screenshot](entpoints.png)

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ♥ by @joaocprofile 👋🏻 &nbsp;

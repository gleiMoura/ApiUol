<p align="center">
  <img  src="https://seeklogo.com/images/U/uol-logo-68F369E089-seeklogo.com.png"
    width="200px" height="200px" >
</p>
<h1 align="center">
  Pate Papo UOL API
</h1>
<div align="center">

  <h3>Built With:</h3>

  <img src="https://img.shields.io/badge/MongoDB-316192?style=for-the-badge&logo=mongodb&logoColor=green" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

This API simulates the classic chat platform "Pate Papo UOL," where users could engage in real-time conversations. With UOL API, you can chat with friends and meet new people. Experience a seamless and dynamic messaging environment designed for making connections and keeping conversations flowing.

</br>

## Features

-   Create an participant
-   Get all participants
-   Create a message
-   Get Messages

</br>

## API Reference

#### participants

```http
POST /participants
```

#### Request:

| Body              | Type     | Description                                       |
| :---------------- | :------- | :------------------------------------------------ |
| `name`           | `string` | **Required**. valid name with only text and numbers|


</br>

#### Response:

<p color="green"> Participante cadastrado com sucesso! </p>

<br/>

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`SECRET = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/gleiMoura/projeto19-drivenpass
```

Go to the project directory

```bash
  cd projeto19-drivenpass/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma migrate reset
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   [@gleiMoura](https://www.github.com/gleiMoura) 🪐

<br/>
<br/>
<br/>

#

<a  href="mailto:contato.lucasalv@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg"></a>

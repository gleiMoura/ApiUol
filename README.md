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
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px"/>
  
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
-   Edit a message
-   Delete a message

</br>

## API Reference

#### participants

```http
POST /participants
```

#### Request:

| Body   | Type     | Description                                         |
| :----- | :------- | :-------------------------------------------------- |
| `name` | `string` | **Required**. valid name with only text and numbers |


</br>

#### Response:

<p>status 200 - participante cadastrado com sucesso!</p>

<br/>

#
<p>Get all participants using app at the moment</p>

```http
GET /participants
```

#### Response:

```json
[
  {
    "_id": "66294bf4c30f1818be7d50e8",
    "name": "Joao",
    "lastStatus": 1713982452112
  },
  {
    "_id": "66294bf6c30f1818be7d50ea",
    "name": "Andre",
    "lastStatus": 1713982454444
  }
]
```

<p>lastStatus is used to know when participant entered at the room.</p>
<p>_id is saved by database</p>

<br/>

#

```http
POST /messages
```

#### Request:

| Body   | Type     | Description                       |
| :----- | :------- | :-------------------------------- |
| `to`   | `string` | **Required**. valid name          |
| `text` | `string` | **Required**. valid message       |
| `type` | `string` | **Required**. type of the message |

<p>"type of the message can be three ways: private-message, message or status</p>
</br>

# headers

| Headers | Type     | Description              |
| :------ | :------- | :----------------------- |
| `User`  | `string` | **Required**. valid name |

#### Response:

<p>status 200 - created</p>

<br/>

#

```http
GET /messages?limit='number of messages do you want'
```
# headers

| Headers | Type     | Description              |
| :------ | :------- | :----------------------- |
| `User`  | `string` | **Required**. valid name |

<p>Send just messages from person present in User</p>

#### Response:

```json
[
  {
    "_id": "6626b8d32aa7b06dcaf80397",
    "to": "Maria",
    "text": "Eu estou morrendo de saudades",
    "type": "message",
    "from": "Joao",
    "time": "16:21:55"
  },
  {
    "_id": "6626b8dc2aa7b06dcaf80399",
    "from": "Joao",
    "to": "Todos",
    "text": "sai da sala...",
    "type": "status",
    "time": "16:22:04"
  },
  {
    "_id": "6626ba092aa7b06dcaf8039b",
    "from": "Joao",
    "to": "Todos",
    "text": "entra na sala...",
    "type": "status",
    "time": "16:27:05"
  }
]
```

<br/>

```http
DELETE /messages/'message ID'
```
<p>It reveives a path param with the message Id to delete.</p>

# headers

| Headers | Type     | Description              |
| :------ | :------- | :----------------------- |
| `User`  | `string` | **Required**. valid name |

<p>It deletes a message from a participant by Id.</p>

#### Response: 

<p>status 404 - message doesn't exist</p>
<p>status 401 - user is not owner of the message</p>
<p>status 200 - message was deleted</p>

<br/>

#

```http
PUT /messages/'message ID'
```
<p>It reveives a path param with the message Id to update.</p>

#### Request:

| Body   | Type     | Description                       |
| :----- | :------- | :-------------------------------- |
| `to`   | `string` | **Required**. valid name          |
| `text` | `string` | **Required**. valid message       |
| `type` | `string` | **Required**. type of the message |


# headers

| Headers | Type     | Description              |
| :------ | :------- | :----------------------- |
| `User`  | `string` | **Required**. valid name |

<p>It deletes a message from a participant by Id.</p>

#### Response: 

<p>status 404 - message doesn't exist</p>
<p>status 401 - user is not owner of the message</p>
<p>status 200 - message was updated</p>

<br/>

#

```http
POST /status
```
# headers

| Headers | Type     | Description                  |
| :------ | :------- | :--------------------------- |
| `User`  | `string` | **Required**. name to update |

<p>It verifies if participant still is in chat and update lastStatus.</p>

#### Response:

<p>status 200 - OK</p>

<br/>

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL_DEV = mongodb://localhost:27017/`

`PORT = number #recommended:5000`

`BANCO = batepapo`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/gleiMoura/projeto19-drivenpass
```

Go to the project directory

```bash
  cd ApiUol/
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

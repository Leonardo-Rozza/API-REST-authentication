# API REST Authentication

Proyecto de ejemplo que implementa una API RESTful de autenticación con **Node.js**, **TypeScript**, **Express** y **MongoDB**, siguiendo los principios de *Clean Architecture*.

---

## ✨ Características

- Registro y login de usuarios con **JWT** (JSON Web Tokens).
- Cifrado de contraseñas con **bcryptjs**.
- Validación de datos y variables de entorno con **env-var**.
- Estructura desacoplada en capas: **presentation**, **infrastructure**, **domain** y **data**.
- Configuración de base de datos MongoDB mediante **Docker Compose**.
- Tipos seguros gracias a **TypeScript**.
- Scripts de desarrollo, build y producción listos en `package.json`.

---

## 🏗️ Stack & dependencias principales

| Herramienta | Versión (package.json) | Uso |
|-------------|-----------------------|-----|
| Node.js     | ≥ 18                  | Runtime JS |
| TypeScript  | ^5.8                  | Tipado estatico |
| Express     | ^4.21                 | Servidor HTTP |
| Mongoose    | ^8.13                 | ODM MongoDB |
| JsonWebToken| ^9.0                  | Tokens de acceso |
| bcryptjs    | ^3.0                  | Hash de contraseñas |
| dotenv      | ^16.4                 | Variables de entorno |

---

## 📂 Estructura de carpetas

```
├── src
│   ├── app.ts              # Punto de entrada
│   ├── config/             # Utilidades (envs, jwt, bcrypt…)
│   ├── data/               # Conexión & modelos MongoDB
│   ├── domain/             # Entidades, DTOs & use‑cases
│   ├── infrastructure/     # Datasources, repositorios, mappers
│   └── presentation/       # Rutas, controladores, middlewares
└── docker-compose.yml
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` a partir de `.env.template`:

```env
PORT=3000
MONGO_URL=mongodb://mongo-user:123456@localhost:27017
MONGO_DB_NAME=auth_db
JWT_SECRET=change-me
```

> **Tip**: todos los valores son obligatorios; `env-var` abortará la ejecución si falta alguno.

---

## 🚀 Levantando el proyecto

### 1. Clonar y preparar

```bash
git clone https://github.com/Leonardo-Rozza/API-REST-authentication.git
cd API-REST-authentication
cp .env.template .env  # edita los valores
```

### 2. Base de datos con Docker (opcional)

```bash
docker compose up -d
```

Esto iniciará un contenedor **mongo:6.0.6** exponiendo el puerto `27017`.

### 3. Modo desarrollo

```bash
npm install
npm run dev
```

Servidor escuchando en `http://localhost:${PORT}` con *hot‑reload* gracias a **ts-node/esm**.

### 4. Build & producción

```bash
npm run start
```

Compila a `./dist` y ejecuta JavaScript puro.

---

## 📑 Endpoints

| Método | URI              | Descripción                  | Auth |
|--------|------------------|------------------------------|------|
| POST   | `/api/auth/register` | Crear nuevo usuario          | ❌ |
| POST   | `/api/auth/login`    | Login y obtener JWT          | ❌ |
| GET    | `/api/auth/`         | Listar usuarios (demo)       | ✅ *Bearer Token* |

Cuerpo JSON para **register**:

```json
{
  "email": "user@mail.com",
  "password": "secret",
  "name": "John Doe"
}
```

Cuerpo JSON para **login**:

```json
{
  "email": "user@mail.com",
  "password": "secret"
}
```

La respuesta incluye:

```json
{
  "user": { "id": "...", "email": "...", "name": "John Doe" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Utiliza el token en la cabecera `Authorization: Bearer <token>` para acceder a rutas protegidas.


## 🤝 Contribuciones

1. Haz un *fork* del proyecto
2. Crea tu rama con la feature: `git checkout -b feat/nueva-feature`
3. Haz *commit* de tus cambios: `git commit -m 'feat: ...'`
4. Haz *push* a tu rama: `git push origin feat/nueva-feature`
5. Abre un **Pull Request**

---


# Rustic Backend API

## Descripción

Este repositorio contiene el backend de la aplicación **Rustic**.

El backend se encarga de gestionar la lógica del servidor, manejar las peticiones HTTP y conectarse a la base de datos. La API permite que el frontend de la aplicación interactúe con el sistema para obtener, crear, modificar y eliminar datos.

Este proyecto forma parte de una aplicación web completa con frontend y backend separados.

---

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* JavaScript
* Git

---

## Base de datos

El proyecto utiliza **MongoDB**, una base de datos NoSQL orientada a documentos, para almacenar la información de la aplicación.

La conexión con la base de datos permite gestionar los datos de forma flexible y escalable.

---

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* MongoDB

---

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/marcmataa/backend-rustic.git
```

2. Entrar en la carpeta del proyecto

```bash
cd backend-rustic
```

3. Instalar dependencias

```bash
npm install
```

4. Ejecutar el servidor en modo desarrollo

```bash
npm run dev
```

---

## Funcionalidades del backend

* Creación de una API REST
* Conexión con la base de datos MongoDB
* Gestión de peticiones HTTP
* Comunicación con el frontend
* Gestión de datos de la aplicación

---

## Estructura del proyecto

```
src/
 ├── controllers   # Lógica de la aplicación
 ├── routes        # Definición de rutas de la API
 ├── models        # Modelos de la base de datos
 ├── config        # Configuración del servidor o base de datos
 └── server.js     # Archivo principal del servidor
```

---

## Autor

**Marc Mata**

Desarrollo completo del proyecto:

* Backend
* Frontend
* Integración con base de datos

---

## División de tareas

| Miembro   | Tarea                         |
| --------- | ----------------------------- |
| Marc Mata | Desarrollo del backend        |
| Marc Mata | Desarrollo del frontend       |
| Marc Mata | Conexión con la base de datos |

---

## Control de versiones

Este proyecto utiliza **Git** para el control de versiones y está alojado en GitHub.

Repositorio backend:
https://github.com/marcmataa/backend-rustic

---

## Frontend del proyecto

El frontend de esta aplicación está desarrollado con Angular.

Repositorio del frontend:
https://github.com/marcmataa/frontend-rustic.git

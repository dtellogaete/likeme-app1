# README - Frontend

## Instalación

Para utilizar el frontend de forma correcta, se debe ejecutar el siguiente comando en `likeme\fronend\`:

1. Ejecutar el siguiente comando para instalar las dependencias necesarias:
   ```
   npm i --legacy-peer-deps
   ```

## Uso

Una vez instaladas las dependencias, se debe ejecutar el siguiente comando en `likeme\fronend\`:
   ```
   npm run start
   ```
Visualización del frontend en uso:

![Frontend Like Me](/likeme.png)

# README - Backend

El backend de esta aplicación consta de dos funciones principales:

1. `getPost()`:
   Esta función se encarga de obtener todas los posts almacenados en la base de datos. Realiza una consulta a la tabla "posts" y devuelve las filas correspondientes. Aquí está el código:

   ```
   const getPosts = async () => {
     const response = await pool.query('SELECT * FROM posts');
     return response.rows;
   };
   ```

2. `addPosts`:
   Esta función se encarga de agregar una nuevo post a la base de datos. Recibe un objeto `req` que contiene los datos de la publicación, como el título, la imagen (url), la descripción y los likes (de tipo entero). Luego ejecuta una consulta de inserción en la tabla "posts" con los valores proporcionados:

   ```
   const addPosts = async (req) => {
     try {
       const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)';
       const values = [req.titulo, req.img, req.descripcion, req.likes];
       const res = await pool.query(query, values);
       return res;
     } catch (error) {
       throw error;
     }
   };
   ```

Con Express, se implementan las siguientes rutas para interactuar con los posts:

1. GET Posts:
   Esta ruta responde a una solicitud GET en la ruta '/posts'. Llama a la función `getPosts` para obtener las publicaciones y las devuelve en formato JSON como respuesta. Si ocurre algún error, se devuelve un estado 500 con un mensaje de error. Aquí está el código:

   ```javascript
   app.get('/posts', async (req, res) => {
     try {
       const posts = await getPosts();
       res.status(200).json(posts);
     } catch {
       res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
     }
   });
   ```

2. POST Posts:
   Esta ruta responde a una solicitud POST en la ruta '/posts'. Recibe los datos de la publicación en el cuerpo de la solicitud (`req.body`). Llama a la función `addPosts` para agregar la publicación a la base de datos y devuelve la respuesta como JSON. Si ocurre algún error, se devuelve un estado 500 con un mensaje de error:

   ```javascript
   app.post('/posts', async (req, res) => {
     try {
       const payload = req.body;
       const post = await addPosts(payload);
       res.status(200).json(post);
     } catch (error) {
       res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
     }
   });
   ```

## Base de datos

Este backend utiliza una base de datos Postgresql llamada `likeme` y una conexión a través de `pool`. 

La estructura de la base de datos es la siguiente: 

```sql
CREATE TABLE posts (
  id SERIAL,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
```

/* Pool */
const { Pool } = require('pg');

require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  allowExitOnIdle: process.env.ALLOW_EXIT_ON_IDLE === 'true',
};

const pool = new Pool(config);

/* Verificar conexión a la base de datos */
pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
      done(); // Liberar cliente de la pool
    }
  });

/* Get Posts */
const getPosts = async () => {
    const response = await pool.query('SELECT * FROM posts');
    return response.rows;
};

/* Add Post */
const addPosts = async (req) => {
    try {
        console.log(req);
      const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)';
      const values = [req.titulo, req.img, req.descripcion, req.likes];
      const res = await pool.query(query, values);
      return res;
    } catch (error) {
      throw error;
    }
  };
module.exports = { getPosts, addPosts };

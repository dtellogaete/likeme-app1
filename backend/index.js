/* Express */
const express = require('express');

/* Cors */
const cors = require('cors');

/* Import DB*/
const { getPosts, addPosts } = require('./db.js');
const { error } = require('console');

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Levantar el servidor con puerto 3002 */
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});

/* GET Posts*/
app.get('/posts', async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: 'Internal Server Error' , errorMessage: error.message });
    }
});

/* POST Posts */
app.post('/posts', async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload);
      const post = await addPosts(payload);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
    }
  });

  
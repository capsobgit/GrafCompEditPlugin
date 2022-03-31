const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

//Route to get coordinates

app.put('/api/replace/:id', (req, res) => {
  const id = req.params.id;
});

app.get('/api/retrieve/:id', (req, res) => {});

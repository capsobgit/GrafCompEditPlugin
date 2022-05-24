const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Route to get appState

dbGet = (paramName) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT JSON_EXTRACT(state,'$.${paramName}') AS '${paramName}' FROM jsonAppState`, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

app.get('/api/get/:data', async (req, res) => {
  try {
    const paramObject = req.params;
    const name = paramObject.data;
    let paramName;
    switch (name) {
      case 'nodes':
        paramName = 'nodes';
        break;
      case 'edges':
        paramName = 'edges';
        break;
      case 'viewport':
        paramName = 'viewport';
        break;
      default:
        throw new Error('Invalid paramURL');
    }
    const result = await dbGet(paramName);
    console.log('Get successful');
    res.status(200).json(result);
  } catch (err) {
    console.error('seltsamer GET Error: ', err);
    res.send(result.status(500));
  }
});

async function dbUpdate(id, content) {
  try {
    return new Promise((resolve) => {
      const result = db.query(`UPDATE jsonAppState SET id  = '${id}', state = '${content}'`);
      resolve(result);
    }).then(console.log('Update successful'));
  } catch (err) {
    console.error('seltsamer PUT Error: ', err);
  }
}

app.put('/api/put/:id', (req, res) => {
  const id = req.params.id;
  const body = JSON.stringify(req.body);
  res.send(dbUpdate(id, body));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} .. []`);
});

module.exports = app;

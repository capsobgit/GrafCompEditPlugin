const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'grafana',
  password: 'grafana123',
  database: 'grafana',
});

module.exports = db;

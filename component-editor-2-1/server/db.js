const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'grafana',
  password: '',
  database: 'plugin_data',
});

module.exports = db;

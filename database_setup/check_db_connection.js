let db = require('mysql');

let db_config = require('../config/db_config.js');
let con = db.createConnection(db_config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

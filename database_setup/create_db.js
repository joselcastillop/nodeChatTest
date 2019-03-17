let db = require('mysql');

let db_config = require('../config/db_config.js');
let con = db.createConnection(db_config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE basic_chat", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

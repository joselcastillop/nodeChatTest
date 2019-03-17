let db = require('mysql');

let db_config = {
  host    : 'localhost',
  user    : 'root',
  password: '12345678',
};

let con = db.createConnection(db_config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE basic_chat", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

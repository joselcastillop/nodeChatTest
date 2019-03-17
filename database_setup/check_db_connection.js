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
});

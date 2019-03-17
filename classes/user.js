
var crypto = require('crypto');
let db = require('mysql');
let db_config = require('../config/db_config.js');
let connection = db.createConnection(db_config);


exports.exists = function (username, callback, notExistCallback) {
    var id = 0;
    let sql = `SELECT uid FROM user WHERE username = ?`;
    connection.query(sql, username, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results[0]);
        if(results[0] != undefined){
            callback(results[0].uid);
        }else{
            notExistCallback();
        }
    });
};

exports.createUser = function (username, callback, notExistCallback) {
    var md5 = crypto.createHash('md5').update(username).digest("hex");
    let stmt = `INSERT INTO user(username, uid, is_admin) VALUES (?, ?, ?);`;
    let values = [username, md5, 0];
    // execute the insert statment
    connection.query(stmt, values, (err, results, fields) => {
    if (err) {
        notExistCallback();
        return console.error(err.message);
    }
        callback();
    });
}

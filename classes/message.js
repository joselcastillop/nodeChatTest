
var crypto = require('crypto');
let db = require('mysql');
let db_config = require('../config/db_config.js');
let connection = db.createConnection(db_config);


exports.retrieveHistory = function (username, callback, notExistCallback) {
    var id = 0;
    let sql = `SELECT * FROM messages LIMIT 40`;
    connection.query(sql, username, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        if(results != undefined){
            callback(results);
        }else{
            notExistCallback();
        }
    });
};

exports.insertMessage = function (senderId, message, callback, notExistCallback) {
    var messageid = crypto.createHash('md5').update(message).digest("hex");
    var date = new Date();
    var timestamp = date.getTime();
    let stmt = `INSERT INTO messages(messageid, message_body, message_timestamp, sender_id) VALUES (?, ?, ?, ?);`;
    let values = [messageid, message, timestamp, senderId];

    // execute the insert statment
    connection.query(stmt, values, (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
        callback(messageid);
    });
}

exports.deleteMessage = function (senderId, messageId, callback, notExistCallback) {
    let stmt = `UPDATE messages SET deleted_by = ? WHERE messageid = ?;`;
    let values = [senderId,messageId];

    // execute the insert statment
    connection.query(stmt, values, (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
        callback(messageId);
    });
}

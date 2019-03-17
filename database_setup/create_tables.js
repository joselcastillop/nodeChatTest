let db = require('mysql');

let db_config = require('../config/db_config.js');
let con = db.createConnection(db_config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE TABLE `user` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `username` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',  `uid` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '', `is_admin` tinyint(4) DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `username` (`username`) ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8", function (err, result) {
    if (err) throw err;
    console.log("Table user created");
  });

  con.query("CREATE TABLE `messages` ( `id` int(11) unsigned NOT NULL AUTO_INCREMENT, `messageid` char(32) NOT NULL DEFAULT '', `message_body` varchar(255) NOT NULL DEFAULT '', `message_timestamp` bigint(11) NOT NULL, `sender_id` char(32) NOT NULL DEFAULT '', `deleted_by` char(32) NOT NULL DEFAULT '', PRIMARY KEY (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8", function (err, result) {
    if (err) throw err;
    console.log("Table messages created");
  });
});

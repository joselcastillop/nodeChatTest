const user = require("./classes/user.js");
const message = require("./classes/message.js");
const express = require('express');
const app = express();


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {

	socket.username = "";

    //listen on change_username
    socket.on('change_username', (data) => {
        //if no username is set, can not be registered
		if (data.username == "") {
			socket.emit('new_message',{message: "User Could Not Be Registered", username: "BOT"});
		} else {
			user.exists(data.username,
                        //callback when username exists
                        //username already exists do nothing
						function () {
							//sets socket username to name given by user
							socket.username = data.username;
                            //sends a message to the user saying Welcome Back
							socket.emit('new_message',{message: "Welcome back "+data.username+"!!", username: "BOT"});
						},
                        //callback when username does not exist
						function () {
                            //registers new user in DB
                            user.createUser(
								data.username,
								function () {
									//change username on socket
									socket.username = data.username;
									//send message to client to let know username has changed and registered
									socket.emit('new_message',{message: "New Username Registered: Welcome! "+data.username, username: "BOT"});
								},
								function () {
									//Error Case
									socket.emit('new_message',{message: "User Could Not Be Registered", username: "BOT"})
								}
							)
						}
					);
		}
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
		user.exists(socket.username,
                    //callback when username exists
					function (uid, dbUsername) {
                        //inserts first message into DB
						message.insertMessage(
							uid,
							data.message,
                            //inserted correctly, sends message to all users
							function (messageId) {
                                io.sockets.emit('new_message', {message : data.message, username : socket.username, messageid: messageId})
							},
                            //not inserted correctly sends back error
							function () {
								socket.emit('new_message',{message: "There seems to be an error", username: "BOT"})
							});
					},
                    //callback when username does not exist
					function () {
						socket.emit('new_message',{message: "User Not Found", username: "BOT"})
					}
				);
    })

    //listen on new_message
    socket.on('delete_message', (data) => {
        //broadcast the new message
		user.exists(socket.username,
                    //callback when username exists
					function (uid, dbUsername) {
                        //deletes message from DB
                        message.deleteMessage(
                            //the userid of the person that deletes the message
							uid,
                            //the message id
							data.mid,
                            //callback when message was deleted
							function (messageId) {
                                io.sockets.emit('delete_message', {message : data.message, username : socket.username, messageid: messageId})
							},
                            //callback when message could not be deleted
							function () {
								socket.emit('new_message',{message: "Message Not Found Or ERROR", username: "BOT"})
							});
					},
                    //callback when username does not exist
					function () {
						socket.emit('new_message',{message: "Message Not Found", username: "BOT"})
					}
				);
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
    //when someone joins in
    socket.on('join', (data) => {
        socket.broadcast.emit('join', {username : socket.username})
    })

    //when someone logs as admin
    socket.on('make_admin', (data) => {
		//checks if user exists
		user.exists(socket.username,
                    //callback when username exists
					function (uid) {
                        //sets flag on on database
						user.makeAdmin(
							socket.username,
                            //callback when admin is set. sends message only to user
							function () {
								socket.emit('new_message',{message: "Admin Set", username: "BOT", is_admin: true})
							},
                            //callback when could not set user flag on
							function () {
								socket.emit('new_message',{message: "User Not Found", username: "BOT"})
							});
					},
                    //callback when username does not exist
					function () {
						socket.emit('new_message',{message: "User Not Found", username: "BOT"})
					}
				);
    })
})

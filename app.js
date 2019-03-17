const user = require("./classes/user.js");
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
		console.log("entrey "+data.username);
		if (data.username == "") {
			socket.emit('new_message',{message: "User Could Not Be Registered", username: "BOT"});
		} else {
			user.exists(data.username,
						function () {
							//username already exists do nothing
							socket.username = data.username;
							socket.emit('new_message',{message: "Welcome back "+data.username+"!!", username: "BOT"});
						},
						function () {
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
					function () {
						io.sockets.emit('new_message', {message : data.message, username : socket.username})
					},
					function () {
						socket.emit('new_message',{message: "User Not Found", username: "BOT"})
					}
				);
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    socket.on('join', (data) => {
        socket.broadcast.emit('join', {username : socket.username})
    })
})

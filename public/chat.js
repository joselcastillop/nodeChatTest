$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

    //Sends Messages through the socket
    send_message.click(function(){
		var str = message.val().split(" ");
		//based on the message implements the commands
		switch(str[0]){
            //Join command. Recreates connection
			case "/join":
				chatroom.append("<p><i> You joined the chat" + "</i></p>");
				socket.connect('http://localhost:3000');
				socket.emit('change_username', {username : username.val()});
				socket.emit('join');
				message.val('');
				console.log('join sent');
				break;
            //Leave command. Destroys Connection
			case "/leave":
				chatroom.append("<p><i> You left the chat" + "</i></p>");
				socket.emit('leave');
				socket.disconnect();
				message.val('');
				break;
            //Clear command. Clears screen
			case "/clear":
				chatroom.empty();
				break;
            //Sends message that do not start with command
			default:
				socket.emit('new_message', {message : message.val()})
				break;
		}
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});

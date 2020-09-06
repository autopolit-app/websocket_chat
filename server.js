const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server in 3000');

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/frontend/chat.html');
});

app.use("/css", express.static(__dirname + '/frontend/css'));
app.use("/js", express.static(__dirname + '/frontend/js'));

io.sockets.on('connection', function (socket) { 

    socket.on('send message', function (data) {
        io.sockets.emit('new message', { msg: data });
    });

    socket.on('user', function (data) {
        io.sockets.emit('user status', { msg: data });
    });

    socket.on('disconnect', function (){
        io.sockets.emit('user exit','对方用户已下线');
    });

});

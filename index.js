const express=require("express");
const http=require("http");
const app=express();
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server);

const messages=[];

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.get('/socket',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/messages',(req,res)=>{
  res.send(messages);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        messages.push(msg);
        console.log(messages);
      });
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
      
  });

server.listen(3000,()=>{
    console.log('listening on port 3000');
});
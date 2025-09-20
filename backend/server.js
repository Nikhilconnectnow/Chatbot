require('dotenv').config();
const app = require('./src/app');

const {createServer}= require('http');
const {Server}=require('socket.io');
const Chatbot = require('./src/service/ai.service');
const httpServer= createServer(app);

const io = new Server(httpServer,{
    cors: {
    origin: process.env.frontenduri, // React app ka origin
    methods: ["GET", "POST"]
  }

});

io.on('connection',(socket)=>{
//console.log('a user connected');

socket.on('disconnect',()=>{
    console.log('user disconnected');
})

socket.on('recived',async (data)=>{
    console.log(data);
        const response= await  Chatbot(data)
        //console.log(response);
    socket.emit('reply', response)
})
});





httpServer.listen(process.env.PORT, ()=>{
    console.log('server is working');
})
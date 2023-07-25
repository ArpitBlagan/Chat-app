const express=require('express');
const app=express();
const { default: mongoose } = require('mongoose');
const cors=require('cors');
const {errorHandler}=require('./errorHandler');
const dotenv=require('dotenv').config();
const router=require('./Router');
mongoose.connect(process.env.URL).then(()=>{console.log("connected")})
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}));
const server=require('http').Server(app);
const io=require('socket.io')(server,{cors:{
    origin:['http://localhost:5173'],credentials:true
}});
app.use('/',router);
const users=[];
const noDup=new Map();
let event=[];
io.on('connection',(socket)=>{
    const number=socket.handshake.query.num;
    if(number){
        socket.join(number);
        if(noDup.has(number)){
            noDup.delete(number);
            noDup.set(number,socket);
        }
        else{   
            const ff=noDup.get(number);
            noDup.set(number,socket);
            users.push(number);
        }
    }
    io.emit('users',users);
    socket.on('send',({to,mess})=>{
        if(event.indexOf({number,ff:'receive'})===-1){
            event.push('receive');
        io.to(to).emit('receive',{mess});}
    });
    socket.on('disconnect',()=>{
        console.log('disconnected');
        const index=users.indexOf({number,socket});
        if(index!==-1){
            users.splice(index,1);
            noDup.delete(number);
        }event=[];
    })
});app.use(errorHandler);
server.listen(6020,()=>{console.log(`listening on port 6020`)});
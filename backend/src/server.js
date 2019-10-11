const express = require('express');
const routes = require('./routes');
const mongoose =  require('mongoose')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const path = require('path')



const app = express();
const server = http.Server(app);
const io = socketio(server)



mongoose.connect('mongodb://omnistack:omnistack@cluster-shard-00-00-utfkx.mongodb.net:27017,cluster-shard-00-01-utfkx.mongodb.net:27017,cluster-shard-00-02-utfkx.mongodb.net:27017/omnistack?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = { };

io.on('connection', socket => {
    

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

    
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.json());
app.use(routes)

server.listen(3333)
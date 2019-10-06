const express = require('express');
const routes = require('./routes');
const mongoose =  require('mongoose')
const cors = require('cors')
const path = require('path')



const app = express();

mongoose.connect('mongodb://omnistack:omnistack@cluster-shard-00-00-utfkx.mongodb.net:27017,cluster-shard-00-01-utfkx.mongodb.net:27017,cluster-shard-00-02-utfkx.mongodb.net:27017/omnistack?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.json());
app.use(routes)

app.listen(3333)
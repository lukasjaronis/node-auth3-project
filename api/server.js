const express = require('express');
const server = express();

// import routers

const authRouter = require('../auth/auth-router');
const userRouter = require('../user/user-router');

server.use(express.json());

// setting endpoints

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`<h1>API LIVE</h1>`)
})

module.exports = server;
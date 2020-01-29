const server = require('./api/server.js');
const port = process.env.port || 10000;

server.listen(port, () => {
    console.log(`LIVE ON LOCALHOST ON PORT ${port}`)
})


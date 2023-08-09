// import packages

const http = require('http');

const respond = require('./lib/respond');


// create server 

const server = http.createServer(respond)

// connection settings

const port = process.env.port || 3000 ;


// listen to client 

server.listen(port, () => {
    console.log(`listening to the port : ${port}`);
})
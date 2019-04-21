const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config();

console.log('**************************************')
const port = process.env.Port || 3600
console.log(`Server listening at ${port}`);

const server = http.createServer(app)

server.listen(port)
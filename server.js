const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config();

const port = process.env.Port || 3600
const server = http.createServer(app)

server.listen(port)
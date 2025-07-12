const corsOptions = {
    origin: 'http://localhost:3000', //frontend URL
    credentials: true, // for sending cookies or auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200  // for legacy browser support
}

module.exports = corsOptions
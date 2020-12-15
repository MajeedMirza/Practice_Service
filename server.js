const config = require('./config/config')

// Init the express application
const app = require('./config/express')()

// Start the app by listening on <port>
const server = app.listen(config.port, () => {
    console.log(`Starting server on port ${config.port}`)
})

process.on('SIGINT', function () {
    console.log("Gracefully shutting down from SIGINT (Ctrl-C)")
    // some other closing procedures go here
    process.exit(1)
})

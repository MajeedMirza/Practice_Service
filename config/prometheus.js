const Prometheus = require('prom-client')


module.exports.prom = Prometheus

module.exports.init = function(){
    const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
    collectDefaultMetrics();
}

module.exports.startTimer = function(app){
    // Runs before each requests
    app.use((req, res, next) => {
        res.locals.startEpoch = Date.now()
        next()
    })
}

module.exports.endTimer = function(app){
    const httpRequestDurationMicroseconds = new Prometheus.Histogram({
        name: 'http_request_duration_ms',
        help: 'Duration of HTTP requests in ms',
        labelNames: ['route'],
        // buckets for response time from 0.1ms to 500ms
        buckets: [15, 50, 100, 200, 300, 400, 500, 1000, 2000]
    })

    // Runs after each requests
    app.use((req, res, next) => {
        const responseTimeInMs = Date.now() - res.locals.startEpoch
        httpRequestDurationMicroseconds
        .labels([req.method, req.originalUrl, res.statusCode])
        .observe(responseTimeInMs)
    })
}
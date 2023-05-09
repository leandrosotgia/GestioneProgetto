const logger = (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()} INFO]:`+ " [REQUEST] " + req.method + ": " + req.originalUrl);
    if (Object.keys(req.query).length != 0)
        console.log("Parametri GET: " + JSON.stringify(req.query));
    if (Object.keys(req.body).length != 0)
        console.log("Parametri POST: " + JSON.stringify(req.body));
    next();
}

module.exports = logger;
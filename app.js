const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const config = require('./config/config.json');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.json');
const BearerAuth = require('./middlewares/check-token');
module.exports = app;

const swaggerConfig = {
    appRoot: __dirname,
    swaggerSecurityHandlers: { BearerAuth }
}
SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) {
        throw err
    }

    // install middleware
    swaggerExpress.register(app)

    const port = process.env.PORT || config.defaultPort
    mongoose.Promise = Promise
    mongoose
        .connect(dbConfig.mongodb)
        .then(() => {
            app.listen(port)
        })
        .catch(console.log)

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott')
    }
})



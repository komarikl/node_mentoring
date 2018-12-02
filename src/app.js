const models = require('./models');
import config from '../config/config.json';

const user = new models.user();
const producr = new models.product();

console.log(config.name);
const path = require('path');
const mongoose = require('mongoose');
const Importer = require('./importer');
const dbConfig = require('./config/db.json');
const citiesFixtures = require('./data/cities');

const Users = require('./models/users');
const Cities = require('./models/cities');
const Products = require('./models/products');

const importer = new Importer();
const fixturesModels = ['Users', 'Products'];

mongoose.Promise = Promise;
mongoose.connect(dbConfig.mongodb)
  .then(() => Cities.create(citiesFixtures))
  .then(() => console.log('[MongoDB] "Cities" fixtures applied!'))
  .then(() => {
    fixturesModels.forEach((model) => {
      const fileDataStream = importer
        .importSchemaObject(path.resolve(`./data/${model.toLowerCase()}.csv`));

      fileDataStream.on('readable', () => {
        let chunk;
        while (null !== (chunk = fileDataStream.read())) {
          (model === 'Users' ? Users : Products).create(chunk)
            .then(() => console.log(`[MongoDB] "${model}" fixtures applied!`));
        }
      });
    })

  })
  .catch(err => console.log(err));

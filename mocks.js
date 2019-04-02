import path from 'path';
import mongoose from 'mongoose';
import { Importer } from './importer';
import { mongodb } from './config/db.json';
import citiesFixtures from './data/cities';

import Users from './models/users';
import Cities from './models/cities';
import Products from './models/products';

const importer = new Importer();
const fixturesModels = ['Users', 'Products'];

mongoose.Promise = Promise;
mongoose.connect(mongodb)
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

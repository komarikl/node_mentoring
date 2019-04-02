import path from 'path'
import fixtures from 'sequelize-fixtures'
import models from './models/'
import { Importer } from './importer'

const importer = new Importer()
const fixturesModels = ['Users', 'Products']

fixturesModels.forEach(model => {
    const fileDataStream = importer.importSchemaObject(path.resolve(`./data/${model.toLowerCase()}.csv`))
    fileDataStream.on('readable', () => {
        let chunk
        while (null !== (chunk = fileDataStream.read())) {
            const fixtureChunks = chunk.map(data => ({ model, data }))
            fixtures.loadFixtures(fixtureChunks, models).then(() => {
                console.log(`"${model}" fixtures applied!`)
            })
        }
    })
})

const Dirwatcher = require('./dirwatcher');
const Importer= require('./importer');
const EventEmitter = require('events').EventEmitter;

const DirWatcher = new Dirwatcher('./data', 1000);
const importer = new Importer('./data');
eventEmitter = new EventEmitter();

importer.init()
.then(data => console.log(data))
.catch(err => console.error(err))
DirWatcher.watch();
eventEmitter.on('changed', path => {
    // comsole.log(importer.importSync(path))
    importer.import(path)
    .then(data => console.log(data))
    .catch(err => console.error(err));
})
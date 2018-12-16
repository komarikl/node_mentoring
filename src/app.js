const Dirwatcher = require('./dirwatcher');
const Importer= require('./importer');

const DirWatcher = new Dirwatcher('./data', 1000);

DirWatcher.watch();

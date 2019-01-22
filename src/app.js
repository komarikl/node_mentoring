const Importer= require('./importer');
const Dirwatcher = require("./dirwatcher");

const DirWatcher = new Dirwatcher('./data', 1000);
new Importer(DirWatcher.getEmmiter());
DirWatcher.watch();
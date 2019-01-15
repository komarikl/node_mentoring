const parse = require("csv-parse");
const fs = require("fs");
const EventEmitter = require("events").EventEmitter;
const Dirwatcher = require("./dirwatcher");

class Importer {
  constructor(path) {
    const emitter = new EventEmitter();
    const DirWatcher = new Dirwatcher(emitter, path);

    emitter.on("changed", filename => {
      // console.log(importer.importSync(path))
      this.import(filename)
        .then(data => console.log(data))
        .catch(err => console.error(err));
    });

    DirWatcher.watch(path, 1000);
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          console.error(err);
          reject("unable file reading");
        }
        if (data) {
          parse(data, (err, parsedData) => {
            if (err) {
              console.error(err);
              reject("unable parsing");
            }

            const resp = {};
            resp[path] = parsedData;
            resolve(resp);
          });
        }
      });
    });
  }

  importSync(path) {
    const data = fs.readFileSync(path);
    if (data) {
      parse(data, (err, parsedData) => {
        if (err) {
          console.error(err);
          return [];
        }
        return parsedData;
      });
    }
  }
}

module.exports = Importer;

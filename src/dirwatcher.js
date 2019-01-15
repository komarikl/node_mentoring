const fs = require('fs');
const nodePath = require('path');

class Dirwatcher {
    constructor(emitter, path){
        this.emitter = emitter;

        fs.readdir(path, (err, files) => {
            files.forEach(filename => {
                this.emitter.emit('changed', nodePath.resolve(path, filename));
            });
        })
    }

    watch(path, delay){
        let fsWait = null;

        fs.watch(path, (event, filename) => {
            if (filename) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, delay);
                this.emitter.emit('changed', nodePath.resolve(path, filename));
            }
        });
    }
}

module.exports =  Dirwatcher;
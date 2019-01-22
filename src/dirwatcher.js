const fs = require('fs');
const nodePath = require('path');
const EventEmitter = require("events").EventEmitter;

class Dirwatcher {
    constructor(path, delay){
        this.emitter = new EventEmitter();
        this.path = path;
        this.delay = delay;

        fs.readdir(path, (err, files) => {
            files.forEach(filename => {
                this.emitter.emit('changed', nodePath.resolve(path, filename));
            });
        })
    }

    getEmmiter(){
        return this.emitter
    }

    watch(){
        let fsWait = null;

        fs.watch(this.path, (event, filename) => {
            if (filename) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, this.delay);
                this.emitter.emit('changed', nodePath.resolve(this.path, filename));
            }
        });
    }
}

module.exports =  Dirwatcher;
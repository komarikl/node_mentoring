const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

eventEmitter = new EventEmitter();
class Dirwatcher {
    constructor(path, delay){
        this.path = path;
        this.delay = delay;
    }

    watch(){
        let fsWait = null;

        fs.watch(this.path, (event, filename) => {
            if (filename) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, this.delay);
                eventEmitter.emit('changed', `${this.path}/${filename}`);
            }
        });
    }
}

module.exports =  Dirwatcher;
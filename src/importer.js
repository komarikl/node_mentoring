const parse = require('csv-parse');
const fs = require('fs');

class Importer {
    constructor(path){
        this.path = path;
    }

    init(){
        const filenames = fs.readdirSync(this.path);

        return Promise.all(filenames.map(filename => {
            return new Promise((resolve, reject) => {    
                const content = fs.readFileSync(`${this.path}/${filename}`);

                parse(content, (err, parsedContent) => {
                    if(err){
                        reject(err)
                    }
                    
                    resolve(parsedContent)
                })
            })
            
        }))
    }

    import(path){
            return new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                      console.error(err)
                      reject('unable file reading')
                    }
                    if(data){
                        parse(data, (err, parsedData) => {
                            if(err){
                                console.error(err)
                                reject('unable parsing')
                            }

                            const resp = {};
                            resp[path] = parsedData;
                            resolve(resp);
                        })
                    } 
                  })
            })
        }

    importSync(path){
            const data = fs.readFileSync(path);
            if(data){
                parse(data, (err, parsedData) => {
                    if(err){
                        console.error(err);
                        return [];
                    }
                    return parsedData;
                })
            } 
    }
}

module.exports =  Importer;
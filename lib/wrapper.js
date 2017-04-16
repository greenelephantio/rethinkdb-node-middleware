'use strict';

const r = require('rethinkdb');

class RWrapper {
    constructor(options){
        this.options = options;
    }

    connect(){
        return r.connect(this.options);
    }

    initDatabase(name){
        let self = this;
        return new Promise(function(resolve, reject){
            self.connect()
            .then((con) => {
                r.dbList().run(con, (err, dblistresult) => {
                    if(dblistresult.indexOf(name) === -1){
                          r.dbCreate(name).run(con)
                          .then(resolve);
                      } else{
                          resolve();
                      }
                });
            });
        });
    }

    // get(table, id){
    //     this.connect()
    //     .then((con)=> {
    //
    //     });
    // }
}
module.exports = RWrapper;

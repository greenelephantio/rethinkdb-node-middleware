'use strict';

const r = require('rethinkdb');

class RWrapper {
    constructor(options){
        this.options = options;
    }

    connect(){
        return r.connect(this.options);
    }

    initTable(table, db){
        let self = this;
        return new Promise(function(resolve, reject){
            self.connect()
            .then((con) => {
                r.db(db).tableList().run(con, (err, tableListResult) => {
                    if(tableListResult.indexOf(table) === -1) {
                        r.db(db).tableCreate(table).run(con)
                        .then(resolve);
                    } else {
                        resolve();
                    }
                });
            });
        });
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

    list(table, db, filter){
        let self = this;
        return new Promise(function(resolve, reject){
            self.connect()
            .then((con) => {
                r.db(db).table(table).filter(filter || {}).run(con)
                .then((res) => {
                    res.toArray((err, cursorResult) =>  {
                        if(err) reject(err);

                        resolve(cursorResult);
                    });
                })
                .catch(reject);
            });
        });
    }

    insert(obj, table, db){
        let self = this;
        return new Promise(function(resolve, reject){
            self.connect()
            .then((con) =>  {
                r.db(db).table(table).insert(obj).run(con, (err, insertResult) => {
                    if(err) reject(err);

                    resolve(insertResult);
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

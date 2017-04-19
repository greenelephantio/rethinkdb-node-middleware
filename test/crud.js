'use strict';

const
    wrapper = require('../lib/wrapper'),
    dbconfig = require('./localRethinkConfig'),
    should = require('chai').should();


describe('listing all in a table', () => {

    before((done) => {
        let w = new wrapper(dbconfig);

        w.initDatabase('nodetest')
        .then((res) => {
            w.initTable('aaa', 'nodetest')
            .then(() => {
                done();
            });
        });
    });

    it('should get all or empty array for unfiltered query', (done) => {
        let w = new wrapper(dbconfig);
        w.list('aaa', 'nodetest')
        .then((res) => {
            done();
        });
    });

    it('should get filtered query or empty array for query with valid filter', (done) => {
        let w = new wrapper(dbconfig);
        let filter = {p: 1};
        w.list('aaa', 'nodetest', filter)
        .then((res) => {
            done();
        });
    });

    it('should not crash and ignore invalid filter', (done) => {
        let w = new wrapper(dbconfig);
        let filter = void(0);

        w.list('aaa', 'nodetest', filter)
        .then((res) => {
            done();
        });
    });

    it('should insert object', (done) => {
        let w = new wrapper(dbconfig);
        let newObj = { a: 1 };

        w.insert(newObj, 'aaa', 'nodetest')
        .then((res) => {
            done();
        });
    })

});

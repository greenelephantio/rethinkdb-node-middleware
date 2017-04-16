'use strict';

const
    wrapper = require('../lib/wrapper'),
    dbconfig = require('./localRethinkConfig'),
    should = require('chai').should();

describe('connecting to Rethink', () => {
    it('should initialize a new connection', (done) => {

        let w = new wrapper(dbconfig);

        w.connect()
        .then((con) => {
            should.exist(con);
            done();
        })
        .catch(done);
    });
});

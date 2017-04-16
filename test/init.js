'use strict';

const
    wrapper = require('../lib/wrapper'),
    dbconfig = require('./localRethinkConfig'),
    should = require('chai').should();

describe('creating a database', () => {
    it('should not create DB if it already exists', (done) => {

        let w = new wrapper(dbconfig);

        w.initDatabase('nodetest')
        .then(result => {
            w.initDatabase('nodetest')
            .then(done)})
        .catch(done);
    });
});

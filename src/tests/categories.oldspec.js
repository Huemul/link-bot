'use strict';

require('should');
var request = require('supertest');
var app = require('./helpers/mock.app');
const newCategory = require('./helpers/newCategory');

describe('Server API', function () {
  this.timeout(15000);

  describe('/api/categories', () => {
    describe('POST /', () => {
      it('should create a new Category', done => {
        request(app)
          .post('/api/categories')
          .set('Accept', 'application/json')
          .send({ name: newCategory.name })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(201);
            res.body.name.should.eql(newCategory.name);

            done();
          });
      });
    });

    describe('GET /', () => {
      it('should retreive all the categories', done => {
        request(app)
          .get('/api/categories')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(200);
            res.body.length.should.be.above(0);
            const last = res.body.length - 1;
            res.body[last].name.should.eql(newCategory.name);

            done();
          });
      });
    });
  });
});
var request = require('supertest');

describe('backend server', function () {
  let server;
  let query;

  beforeEach(function () {
    server = require('../app.js');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to "/" with html', function testRoot(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('404 get to "/doctors"', function testPath(done) {
    request(server)
      .get('/doctors')
      .expect(404, done);
  });

});

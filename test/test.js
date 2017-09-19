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

  it('post to "/doctors" works with location', function testRoot(done) {
    query = { name: 'Andr',
              skip: 0,
              location: "37.773,-122.413,100"};
    request(server)
      .post('/doctors')
      .send(query)
      .expect('Content-Type', /json/, done);
  });

  it('post to "/doctors" works without location', function testRoot(done) {
    query = { name: 'Andr',
              skip: 0,
              location: ""};
    request(server)
      .post('/doctors')
      .send(query)
      .expect('Content-Type', /json/, done);
  });

  it('post to "/doctors" works when no query is passed', function testRoot(done) {
    request(server)
      .post('/doctors')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});

/* globals jest */

import {
  doctorSearch
} from '../util.js';

describe('the api util', () => {
  const query = {
                  name: "alex",
                  skip: 0,
                  location: ""
                };
  beforeEach(() => {
    global.$ = require.requireMock('jquery');
    global.$.ajax = jest.fn(options => "ajax promise");
  });

  afterEach(() => {
    global.$.ajax.mockClear();
  });

  it('doctor makes a post request and returns an ajax promise', () => {
    const returnValue = doctorSearch(query.name, query.skip, query.location);
    expect($.ajax).toBeCalled();

    // This line gets the first argument of the first call to $.ajax
    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('/doctors');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/post/i);
    expect(ajaxCallArg.data).toEqual(query);
    expect(returnValue).toEqual("ajax promise");
  });

});

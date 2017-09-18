/* globals jest */
import ReactDOM from 'react-dom';

describe('entry', () => {
  let Entry,
      Search,
      renderedSearch;

  beforeAll(() => {
    document.addEventListener = jest.fn();
    document.getElementById = jest.fn(id => id);
    ReactDOM.render = jest.fn();

    Search = require('../search');
    Entry = require('../entry.jsx');

    document.addEventListener.mock.calls[0][1]();
    renderedSearch = ReactDOM.render.mock.calls[0][0];
  });

  it('sets a listener for the DOMContentLoaded event', () => {
    const eventListenerCalls = document.addEventListener.mock.calls;

    expect(document.addEventListener).toBeCalled();
    expect(eventListenerCalls[0][0]).toEqual('DOMContentLoaded');
  });

  it('renders the Search component', () => {
    expect(renderedSearch.type).toEqual(Search.default);
  });

  it('queries for and renders into the root div', () => {
    expect(document.getElementById).toBeCalledWith("search");
    expect(ReactDOM.render.mock.calls[0][1]).toEqual("search");
  });

});

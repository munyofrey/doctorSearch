/* globals jest */

import React from 'react';
import Search from '../search';
import * as util from '../util';
import { shallow, mount } from 'enzyme';

describe('search component', () => {
  let searchWrapper,
      doctorInput,
      doctor;

  beforeEach(() => {
    doctor = { first_name: "Walker",
               last_name: "Wallace"};
    util.doctorSearch = jest.fn((name, skip, location) => Promise.resolve([doctor]));
  });

  describe('searching input', () => {
    beforeEach(() => {
      searchWrapper = shallow(<Search />);

      doctorInput = searchWrapper.find('input');
    });

    it('initializes the doctor list to an empty array', () => {
      expect(searchWrapper.state('doctors')).toEqual([]);
    });

    it('initializes skip to zero', () => {
      expect(searchWrapper.state('skip')).toEqual(0);
    });

    it('searches on input', () => {
      doctorInput.simulate('change', { currentTarget: { value: "W" },
                                        preventDefault: () => {} });
      expect(util.doctorSearch).toBeCalledWith("W", 0, '');
    });

    it('displays notice when fetching more doctors',() => {
      searchWrapper.setState({pending: true});
      const notice = searchWrapper.find('.no-doc-notice');
      expect(notice).toBeTruthy();
      expect(notice.props().children).toContain('Fetching updated list!');
    } );

    it('tells you to start typing to find a doctor',() => {
      const notice = searchWrapper.find('.no-doc-notice');
      expect(notice).toBeTruthy();
            expect(notice.props().children).toContain('Start typing to find a doctor!');
    } );

    it('displays displays skip buttons when not pending and doctors in the state',() => {
      searchWrapper.setState({ pending: false, doctors: [doctor] });
      const button = searchWrapper.find('.next-results');

      expect(button.props().children).toContain('See more results!');
    } );

    it('clicking "see more results" querries with higher skip value',() => {
      searchWrapper.setState({ pending: false,
                               doctors: [doctor]});
      const button = searchWrapper.find('.next-results');
      button.simulate('click');
      expect(util.doctorSearch).toBeCalledWith('', 10, '');
    } );
  });

});

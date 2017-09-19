/* globals jest */

import React from 'react';
import SearchItem from '../search_item';
import { shallow } from 'enzyme';

describe('search item', () => {
  let doctor,
      doctor2,
      props,
      props2;


  beforeEach(() => {
    doctor = { first_name: "Munyo",
               last_name: "Frey",
               gender: "Female",
               bio: ""
             };

    props = { doctor };
    props2 = { doctor2 };
  });

  it('should be a function', () => {
    expect(typeof SearchItem).toEqual('function');
  });

  it('shows the doctor\'s name', () => {
    const searchItemWrapper = shallow(<SearchItem {...props} />);
    const name = searchItemWrapper.find('.name');
    expect(name).toBeTruthy();
    expect(name.props().children).toContain(`${doctor.first_name}`);
    expect(name.props().children).toContain(`${doctor.last_name}`);
  });

  it('shows the doctor\'s gender if known', () => {
    const searchItemWrapper = shallow(<SearchItem {...props} />);
    const gender = searchItemWrapper.find('.gender');
    expect(gender).toBeTruthy();
    expect(gender.props().children).toContain(`${doctor.gender}`);
  });

  it('shows "unknown" if the doctor info does not have a gender', () => {
    doctor = { first_name: "Munyo",
               last_name: "Frey",
               gender: "",
               bio: "Not a trained doctor"
             };
    props =  { doctor };
    const searchItemWrapper = shallow(<SearchItem {...props} />);

    const gender = searchItemWrapper.find('.gender');
    expect(gender).toBeTruthy();
    expect(gender.props().children).toContain("unknown");
  });

  it('shows the doctor\'s bio if there is one', () => {
    doctor = { first_name: "Munyo",
               last_name: "Frey",
               gender: "",
               bio: "Not a trained doctor"
             };
    props =  { doctor };
    const searchItemWrapper = shallow(<SearchItem {...props} />);
    const bio = searchItemWrapper.find('.bio');
    expect(bio).toBeTruthy();
    expect(bio.props().children).toContain(`${doctor.bio}`);
  });

  it('it alerts the user if a doctor doesn\'t have a bio', () => {
    const searchItemWrapper = shallow(<SearchItem {...props} />);
    const bio = searchItemWrapper.find('.bio');
    expect(bio).toBeTruthy();
    expect(bio.props().children.toString()).toEqual("Sorry this doctor has no bio!");

  });
});

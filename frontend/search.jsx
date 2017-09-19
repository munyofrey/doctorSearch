import React from 'react';
import SearchItem from './search_item';
import { doctorSearch } from './util';

class Search extends React.Component {
  constructor () {
    super();
    this.state = {
      doctors: [],
      fieldValue: '',
      skip: 0,
      pending: false // to handle backend api calls only happening every .5 seconds
      };

    this.location = ""; // if a user does not allow their location to be shared, will send back empty string

    this.callWithCurrentInput = this.callWithCurrentInput.bind(this);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.handleFieldValue = this.handleFieldValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReturnValues = this.handleReturnValues.bind(this);
    this.prevResults = this.prevResults.bind(this);
    this.nextResults = this.nextResults.bind(this);
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((location) => {
                          let lat = location.coords.latitude;
                          let long = location.coords.longitude;
                          this.location = `${lat},${long},100`;
                        });

  }

  handleSearch () {
    let fieldValue = this.state.fieldValue;
    if (!this.state.pending) {
      this.setState({pending: true}, () => {
        // the BetterDoctor API allows for one request per .5s, by setting a
        // pending portion of state and using setTimeout we onle hit our backend
        // every .5 seconds
        setTimeout(this.callWithCurrentInput(fieldValue).bind(this), 500);
        doctorSearch(fieldValue, this.state.skip, this.location).then(this.handleReturnValues);
      });
     }
  }

    callWithCurrentInput (oldInput) {
      return () => {
        // after .5 seconds from our last call to the backend, we check to see if the
        // user has typed anything. If they have we check if the field is blank or not
        // and make an updated call if needed.
                this.setState({ pending: false }, () => {
                  if (oldInput !== this.state.fieldValue) {
                    this.handleFieldValue();
                  }
                });
              };
    }

    handleReturnValues (data) {
      // since we have a delay between hitting the backend and typing we
      // may have hit 'handleReturnValues' before we get old doctor queries back
      // to account for this we double check that the field value still has some
      // information in it
      if (this.state.fieldValue === '') {
        this.setState({ doctors: [] });
      } else {
        this.setState({ doctors: JSON.parse(data) });
      }
    }

  handleFieldValue () {
    // we don't want to hit the backend if a user has deleted all of their input
    if (this.state.fieldValue === '') {
      this.setState({ doctors: [] });
    } else {
      this.handleSearch();
    }
  }

  inputUpdate (event) {
    event.preventDefault();
    this.setState({
                    fieldValue: event.currentTarget.value,
                    skip: 0
                  }, this.handleFieldValue);
  }

  prevResults (event) {
    event.preventDefault();
    let skip = this.state.skip - 10;
    this.setState({ skip }, this.handleSearch);
  }

  nextResults (event) {
    event.preventDefault();
    let skip = this.state.skip + 10;
    this.setState({ skip }, this.handleSearch);
  }

  paginationCursor () {
    if (this.state.pending) {
      // if we are currently waiting for a response we should let the user
      // know somehow, since there is such a delay it is nice to still allow some
      // results to show - this tells the user new information is coming while still
      // showing the past results (if there are any)
      return <div className='no-doc-notice'>
                  Fetching updated list!
              </div>;
    }

    if (this.state.doctors.length > 0) {
      // this if block handles pagination for the search field
      if (this.state.skip === 0) {
        // in this case the user is on the first page of results
        return <div className='more-results' >
                <div className='next-results'
                  onClick={this.nextResults}>
                    See more results!
                </div>
              </div>;
      } else {
        // in this case the user is on a later page of results,
        // they should be able to see earlier and later results
        return <div className='more-results' >
                <div className='previous-results'
                    onClick={this.prevResults}>
                  See previous results!
                </div>
                <div className='next-results'
                    onClick={this.nextResults}>
                  See more results!
                </div>
              </div>;
      }
    } else {
      if (this.state.fieldValue && !this.state.pending) {
        // if a user has typed information and we have gotten an empty response
        // then we want to let them know there aren't any doctors that match
        return <div className='no-doc-notice'>
                  No doctors match your search!
                </div>;
      } else {
        // in this situation there in no input in the search bar
        return <div className='no-doc-notice'>
                  Start typing to find a doctor!
                </div>;
      }
    }
  }

  render () {
    return <div className='react-body'>
            <input onChange={ this.inputUpdate }
                   value={ this.state.fieldValue } />
 // we map over the doctors and create a list element for each one
 // we keep track of the index of each doctor to insure we get a unique
 // key prop for each li
            <ul>{ this.state.doctors.map((doctor, indx) => (
                <Searchitem key={ `${doctor.first_name}${indx}` }
                          doctors={ this.state.doctors } />
           ))}</ul>
            { this.paginationCursor() }
          </div>;
  }
}

export default Search;

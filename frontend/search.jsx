import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './search_box';
import { doctorSearch } from './util';

class Search extends React.Component {
  constructor () {
    super();
    this.state = {
      doctors: [],
      fieldValue: '',
      skip: 0
      };

    this.searched = false; // to handle backend api calls only happening every .5 seconds

    this.inputUpdate = this.inputUpdate.bind(this);
    this.handleFieldValue = this.handleFieldValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.prevResults = this.prevResults.bind(this);
    this.nextResults = this.nextResults.bind(this);
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((location) => console.log(location));
  }

  handleSearch () {
    let fieldValue = this.state.fieldValue;
    if (!this.searched) {
      this.searched = true;
      setTimeout(() => { this.searched = false; }, 500);
      doctorSearch(fieldValue, this.state.skip).then(data => (
        this.setState({doctors: JSON.parse(data)}))
      ); }
  }

  handleFieldValue () {
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
              skip: 0}, this.handleFieldValue);
  }

  prevResults (event) {
    event.preventDefault();
    let skip = this.state.skip - 10;
    this.setState({skip}, this.handleSearch);
  }

  nextResults (event) {
    event.preventDefault();
    let skip = this.state.skip + 10;
    this.setState({skip}, this.handleSearch);
  }

  paginationCursor () {
    if (this.state.doctors.length > 0) {
      if (this.state.skip === 0) {
        return <div className='more-results' >
                <div className='next-results'
                  onClick={this.nextResults}>
                    See more results!
                </div>
              </div>;
      } else {
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
      if (this.state.fieldValue) {
        return <div className='no-doc-notice'>
                  No doctors match your search!
                </div>;
      } else {
        return <div className='no-doc-notice'>
                  Start typing to find a doctor!
                </div>;
      }
    }
  }

  render () {
    return <div className='react-body'>
            <input onChange={this.inputUpdate} value={this.state.fieldValue} />
            <SearchBox doctors={this.state.doctors} />
            {this.paginationCursor()}
          </div>;
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Search />, document.getElementById('search'));
});

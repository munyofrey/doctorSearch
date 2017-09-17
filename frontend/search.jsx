import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  constructor () {
    super();
    this.state = {
      doctors: [],
      fieldValue: ''
      };

    this.inputUpdate = this.inputUpdate.bind(this);
    this.handleFieldValue = this.handleFieldValue.bind(this);
  }

  handleFieldValue () {
    let fieldValue = this.state.fieldValue;
    if (fieldValue === '') {
      this.setState({ doctors: [] });
    } else {
      $.ajax({
        method: 'POST',
        url: '/doctors',
        data: {
          name: fieldValue
          // skip
          // location
          }
        }).then(data => this.setState({
                              doctors: JSON.parse(data)}))
      ;
    }
  }


  inputUpdate (event) {
    event.preventDefault();
    this.setState({fieldValue: event.currentTarget.value}, this.handleFieldValue);

  }


  render () {
    return <div>
            <input onChange={this.inputUpdate} value={this.state.fieldValue} />
            <ul>{this.state.doctors.map(profile => (
                <li> {profile.first_name} {profile.last_name} </li>
              )
            )}</ul>
          </div>;
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Search />, document.getElementById('search'));
});

import React from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const doctorBio = doc => {
      if (doc.profile.bio === '') {
        return <p className='no-bio bio'>
          Sorry this doctor has no bio!
        </p>;
      } else {
      return  <p className='bio'>
          {doc.profile.bio}
        </p>;
      }
    };

    const gender = doc => doc.profile.gender ? doc.profile.gender : 'unknown';

    return <ul>{ this.props.doctors.map(doctor => {
                return <li key={`${doctor.profile.bio}${doctor.profile.first_name}`}>
                 <div className='doctor-header'>
                   <div>Dr. { doctor.profile.first_name } { doctor.profile.last_name } </div>
                   <div>Gender: { gender(doctor) } </div>
                 </div>
                 { doctorBio(doctor) }
               </li>;
            })}</ul>;
  }
}


export default SearchBox;

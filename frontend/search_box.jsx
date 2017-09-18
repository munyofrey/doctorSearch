import React from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const doctorBio = doc => {
      if (doc.bio === '') {
        return <p className='no-bio bio'>
          Sorry this doctor has no bio!
        </p>;
      } else {
      return  <p className='bio'>
          {doc.bio}
        </p>;
      }
    };

    const gender = doc => doc.gender ? doc.gender : 'unknown';

    return <ul>{ this.props.doctors.map((doctor, indx) => {
                return <li key={`${doctor.first_name}${indx}`}>
                 <div className='doctor-header'>
                   <div>Dr. { doctor.first_name } { doctor.last_name } </div>
                   <div>Gender: { gender(doctor) } </div>
                 </div>
                 { doctorBio(doctor) }
               </li>;
            })}</ul>;
  }
}


export default SearchBox;

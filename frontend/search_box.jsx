import React from 'react';

  const doctorBio = doc => {
    if (doc.bio === '') {
      // if there isn't a bio we should let the user know!
      return <p className='no-bio bio'>
        Sorry this doctor has no bio!
      </p>;
    } else {
    return  <p className='bio'>
        { doc.bio }
      </p>;
    }
  };

  // we should alert the use if the gender is unknow
  const gender = doc => doc.gender ? doc.gender : 'unknown';

  const SearchBox = ({ doctors }) => (
      // we map over the doctors and create a list element for each one
      // we keep track of the index of each doctor to insure we get a unique
      // key prop for each li
      <ul>{ doctors.map((doctor, indx) => (
         <li key={`${ doctor.first_name }${ indx }`}>
          <div className='doctor-header'>
            <div>Dr. { doctor.first_name } { doctor.last_name } </div>
            <div>Gender: { gender(doctor) } </div>
          </div>
          { doctorBio(doctor) }
        </li>
      ))}</ul>
  );


export default SearchBox;

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

  // we should alert the use if the gender is unknown
  const gender = doc => doc.gender ? doc.gender : 'unknown';

  const SearchItem = ({ doctor }) => (
         <li >
          <div className='doctor-header'>
            <div className='name'>Dr. { doctor.first_name } { doctor.last_name } </div>
            <div className='gender'>Gender: { gender(doctor) } </div>
          </div>
          { doctorBio(doctor) }
        </li>
  );


export default SearchItem;

// handles hiding the api key, creating a .env in the root directory with
// "DOCTOR_KEY=yourkey" will allow the server to properly run
require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const https = require('https');

// make our frontend files serverable
app.use(express.static('public'));

// make a user's root request to our site render the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// if we recieve a post request from our frontend we will want to hit BetterDoctor's API
app.post('/doctors', function (req, res) {
  let query = '';
  let doctorList;

  req.on('data', dataChunk => {
    query += dataChunk.toString();
    });

  req.on('end', () => {
    // We will use the responseData for our http request
    let responseData = '';

    // if for some reason we made an empty post request we don't want to
    // make an external call
    if (query) {
      // since our data from the request can come in stages we add the set
      // query information for user_key and sorting options right before we
      // send off our request to BetterDoctor
      query += `&user_key=${process.env.DOCTOR_KEY}`;
      query += `&sort=rating-asc`;

      let url = 'https://api.betterdoctor.com/2016-03-01/doctors?'+ query;

      https.get(url, (response) => {
        response.on('data', dataChunk => {
          responseData += dataChunk.toString();
          });

        response.on('end', () => {
          // our responseData is now complete and we can parse it
          responseData = JSON.parse(responseData);
          // we want to make sure we didn't get an error back from the API
          if (!responseData.meta.error){
            // we only use the profile information when displaying doctors
            // so we trim down the response from the api, if we had a show page
            // for the doctors including information about the insurance providers, ect
            // would be beneificial
            doctorList = responseData.data.map(el => el.profile);
            res.write(JSON.stringify(doctorList), () => res.end());
          }
        });
      });
  }});
});

const server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = server;

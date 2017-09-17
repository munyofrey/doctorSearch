require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const https = require('https');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/doctors', function (req, res) {
  let query;
  let doctorList;

  req.on('data', dataChunk => {
    query = dataChunk.toString();
    query += `&user_key=${process.env.DOCTOR_KEY}`;
    query += `&sort=rating-asc`;
    });

  req.on('end', () => {
    let responseData = '';

    if (query) {

      let url = 'https://api.betterdoctor.com/2016-03-01/doctors?'+ query;

      https.get(url, (response) => {
        response.on('data', dataChunk => {
          console.log("data", dataChunk.toString());
          responseData += dataChunk.toString();
          });

        response.on('end', () => {
          console.log("responseData",responseData);
          responseData = JSON.parse(responseData);
          if (!responseData.meta.error){
            doctorList = responseData.data;
            res.write(JSON.stringify(doctorList), () => res.end());
          } else {
            // error handling for api call - send back error to frontend
          }
        });
      });
  }});
});


app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// hit with the params of 'name', 'location' takes 37.773,-122.413,100 (lat, long, circlular miles)
// 'user_location' orders by closest ???

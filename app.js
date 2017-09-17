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
      console.log(query);
      let url = 'https://api.betterdoctor.com/2016-03-01/doctors?'+ query;

      https.get(url, (response) => {
        response.on('data', dataChunk => {
          responseData += dataChunk.toString();
          });

        response.on('end', () => {
          doctorList = JSON.parse(responseData).data.slice(0, 100).map(doc => (doc.profile));
          res.write(JSON.stringify(doctorList), () => res.end());
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

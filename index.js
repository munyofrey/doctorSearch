require('dotenv').config();
const http = require('http');
const querystring = require('querystring');
const https = require('https');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
      let query;
      let doctorList;

      req.on('data', dataChunk => {
        query = dataChunk.toString();
        query += `&user_key=${process.env.DOCTOR_KEY}`;
        console.log(query);
        });

      req.on('end', () => {
        let responseData = '';

        if (query) {
          let url = 'https://api.betterdoctor.com/2016-03-01/doctors?'+ query;

          https.get(url, (response) => {
            response.on('data', dataChunk => {
              responseData += dataChunk.toString();
              });

            response.on('end', () => {
              doctorList = JSON.parse(responseData).data.slice(0, 100).map(doc => (doc.profile));
              res.write(JSON.stringify(doctorList))
              res.end();
              });
          });

        } else {
          res.write('there was an error in handling your request');
          res.end();
        }
      })
    };

  }
);


server.listen(8000, () => console.log(`great job`))



// hit with the params of 'name', 'location' takes 37.773,-122.413,100 (lat, long, circlular miles)
// 'user_location' orders by closest ???

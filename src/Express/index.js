const express = require('express');
var request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send', async function(req, res) {
    let text = req.body.text;
    const postData = {
        sender: {
          name: "Sender Alex",
          email: "alimaslax@gmail.com"
        },
        to: [
          {
            email: "alimaslax.web@gmail.com",
            name: "John Doe"
          }
        ],
        subject: "Hello world",
        htmlContent: "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
      };
    var clientServerOptions = {
        uri: 'https://api.sendinblue.com/v3/smtp/email',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept':'application/json',
            'api-key':'XXXX',

        }
    }
    text = await doRequest(clientServerOptions);
    res.send({
      'text': text,
    });
  });

  function doRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, res) {
            if (!error && res.statusCode == 200 || res.statusCode == 201) {
                resolve(res.body);
              } else {
                reject(error);
              }
        });
    });
  }

  
  app.listen(port);
  console.log('Server started at http://localhost:' + port);
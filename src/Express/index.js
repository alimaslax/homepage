const express = require('express');
var request = require('request');
var cors = require('cors')

const app = express();
const port = process.env.EXPRESS_PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/send', async function (req, res) {
    let message = req.body;
    const postData = {
        sender: {
            name: message.contactName,
            email: message.contactEmail
        },
        to: [
            {
                email: "alimaslax.web@gmail.com",
                name: "Maslax Ali Web"
            }
        ],
        subject: message.contactSubject,
        htmlContent: "<html><head></head><body>" + message.contactMessage.replace(/[^a-zA-Z ]/g, "") + "</body></html>"
    };
    var clientServerOptions = {
        uri: 'https://api.sendinblue.com/v3/smtp/email',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'api-key': process.env.SENDINBLUE_APIKEY,

        }
    }
    try {
        var msg = await doRequest(clientServerOptions);
        console.log(msg);
        res.statusCode = 200;
        res.send({
            'msg': "success",
        });
    } catch (error) {
        res.statusCode = 500;
        res.send({
            'error': "error sending email",
        });
    }
});

// verify reCAPTCHA response
app.post('/verify', async function (req, res) {
    var clientServerOptions = {
        uri: "https://www.google.com/recaptcha/api/siteverify?secret="+process.env.GOOGLE_RECAPTCHASITEKEY+"&response=" + req.body.token,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }
    try {
        var msg = await doRequest(clientServerOptions);
        var obj = JSON.parse(msg);
        if (obj.success)
            res.statusCode = 200;
        else
            res.statusCode = 500;
        res.send({
            'success': obj.success
        });

    } catch (error) {
        res.statusCode = 500;
        res.send({
            'error': "error sending email",
        });
    }
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
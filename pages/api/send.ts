import { NextApiRequest, NextApiResponse } from "next";
var request = require("request");

const msgErrorEmail = "Error in Email";
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
async function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res) {
      if ((!error && res.statusCode == 200) || res.statusCode == 201) {
        resolve(res.body);
      } else {
        reject(error);
      }
    });
  });
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let email = request.body;
  let validEmail = validateEmail(email.contactEmail);

  if (!validEmail) {
    response.status(400).json({
      body: request.body,
      msg: msgErrorEmail,
      cookies: request.cookies,
    });
    return;
  }

  let sender = email.contactEmail.substring(0, email.contactEmail.indexOf("@"));

  const postData = {
    sender: {
      name: email.contactName,
      email: `${sender}@sendinblue.com`,
    },
    to: [
      {
        email: "alimaslax.web@gmail.com",
        name: "Maslax Ali Web",
      },
    ],
    subject: email.contactSubject,
    htmlContent:
      "<html><head></head><body>" +
      email.contactMessage.replace(/[^a-zA-Z ]/g, "") +
      "<br/> Email: " +
      email.contactEmail +
      "</body></html>",
  };
  var clientServerOptions = {
    uri: "https://api.sendinblue.com/v3/smtp/email",
    body: JSON.stringify(postData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": process.env.SENDINBLUE_APIKEY,
    },
  };
  try {
    const sendInBlue = async () => {
      var msg = await doRequest(clientServerOptions);
      response.status(200).json({
        body: request.body,
        msg: "success",
        cookies: request.cookies,
      });
    };
    sendInBlue();
    response.status(200).json({
      body: {
        msg: "success",
      },
    });
  } catch (error) {
    response.status(500).json({
      body: request.body,
      error: "Email Failed to send",
      cookies: request.cookies,
    });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
var request = require("request");

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
  var clientServerOptions = {
    uri:
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
      process.env.GOOGLE_RECAPTCHASITEKEY +
      "&response=" +
      request.body.token,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };
  try {
    const msg = (await doRequest(clientServerOptions)) as string;
    var obj = JSON.parse(msg);
    if (obj.success) {
      response.status(200).json({
        body: {
          success: true,
        },
      });
    } else {
      response.status(500).json({
        body: {
          error: "robot",
        },
      });
    }
  } catch (error) {
    response.status(200).json({
      body: {
        error: "reCaptcha did not work",
      },
      query: request.query,
      cookies: request.cookies,
    });
  }
}

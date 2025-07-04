import React, { useState, useEffect } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import useSiteStore from "../store/useSiteStore";

export default function Contact(props) {
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactSubject, setContactSubject] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [formError, setFormError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailInFlight, setEmailInFlight] = useState(false);
  const { isRobot, profile, apiKey, toggleIsRobot } = useSiteStore();

  // TODO:: this method is called twice by reCaptcha, why?
  const verifyRecaptchaCallback = (token) => {
    console.log("called");
    const data = {
      token: token,
    };
    const requestMetadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/api/verify", requestMetadata)
      .then((res) => res.json())
      .then((res) => {
        if (res.body.success) {
          toggleIsRobot(false);
        } else {
          toggleIsRobot(true);
        }
      });
  };

  const sendEmail = () => {
    if (
      contactName.length < 3 ||
      contactEmail.length < 3 ||
      contactSubject.length < 3 ||
      contactMessage.length < 3
    ) {
      setFormError(true);
      return;
    }
    var data = {
      contactName: contactName,
      contactEmail: contactEmail,
      contactSubject: contactSubject,
      contactMessage: contactMessage,
    };
    const requestMetadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(data),
    };
    try {
      setEmailInFlight(true);
      fetch("/api/send", requestMetadata)
        .then((res) => res.json())
        .then((response) => {
          setTimeout(() => {
            setEmailInFlight(false);
            setEmailSent(true);
          }, 2000);
        });
    } catch (error) {
      toggleIsRobot(true);
      console.log("error");
    }
  };

  useEffect(() => {
    // Client-side-only code
    if (typeof window !== "undefined") {
      return;
    }
  }, []);

  if (!props) return null;
  return (
    <section id="contact">
      <div>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{"Get In Touch"}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <GoogleReCaptchaProvider reCaptchaKey={apiKey}>
            <form
              id="contactForm"
              style={{
                display: emailSent ? "none" : "block",
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    size={35}
                    id="contactName"
                    name="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    size={35}
                    id="contactEmail"
                    name="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    size={35}
                    id="contactSubject"
                    name="contactSubject"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    cols={50}
                    rows={15}
                    id="contactMessage"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    name="contactMessage"
                  ></textarea>
                </div>
                <GoogleReCaptcha
                  onVerify={isRobot ? verifyRecaptchaCallback : null}
                />
                <div>
                  <button
                    className="submit"
                    disabled={isRobot}
                    onClick={() => sendEmail()}
                  >
                    Submit
                  </button>
                  <span
                    id={emailInFlight ? "image-loader divIn" : "image-loader"}
                  >
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </fieldset>
            </form>
          </GoogleReCaptchaProvider>
          <div id={formError ? "message-warning divIn" : "message-warning"}>
            {" "}
            Please Check Your Form
          </div>
          <div id={emailSent ? "message-success divIn" : "message-success"}>
            <i className="fa fa-check"></i>Your message was sent, thank you!
            <br />
          </div>
        </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Location</h4>
              <p className="address">
                {'Columbus'}, {'Ohio'}
              </p>
            </div>

            <div className="widget widget_tweets">
              <h4 className="widget-title">Latest Tweets</h4>
              <ul id="twitter">
                <li>
                  <a
                    className="twitter-timeline"
                    data-width="300"
                    data-height="500"
                    data-dnt="true"
                    data-theme="dark"
                    href="https://twitter.com/alimaslax?ref_src=twsrc%5Etfw"
                  >
                    Tweets by alimaslax
                  </a>
                </li>
              </ul>
            </div>
          </aside>
      </div>
      <ul className="copyright">
        <li>&copy; Copyright 2022 Maslax Ali</li>
        <li>
          Design by{" "}
          <a
            title="Styleshout"
            href="https://github.com/tbakerx/react-resume-template"
          >
            tbakerx
          </a>
        </li>
      </ul>
    </section>
  );
}

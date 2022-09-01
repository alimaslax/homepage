import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import $ from 'jquery';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.reset();
  }
  reset() {
    // Always set the initial state in its own function, so that
    // you can trivially reset your components at any point.
    this.state = {
      contactName: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: "",
      isRobot: true
    };
  }
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form id="contactForm" onSubmit={e => e.preventDefault()}>
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      size="35"
                      id="contactName"
                      name="contactName"
                      value={this.state.contactName}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      value={this.state.contactEmail}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      value={this.state.contactSubject}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      value={this.state.contactMessage}
                      onChange={this.handleChange}
                      name="contactMessage"
                    ></textarea>
                  </div>
                  <div>
                    <button className="submit" disabled={this.state.isRobot} onClick={this.sendEmail}>Submit</button>
                    <span id="image-loader" ref="imageLoader">
                      <img alt="" src="images/loader.gif" />
                    </span>
                  </div>
                </fieldset>
              </form>
              <div id="message-warning"> Please Check Your Form</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Location</h4>
                <p className="address">
                  {city}, {state}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>

              <div className="widget widget_tweets">
                <h4 className="widget-title">Latest Tweets</h4>
                <ul id="twitter">
                  <li>
                    <a class="twitter-timeline" data-width="300" data-height="500" data-dnt="true" data-theme="dark" href="https://twitter.com/alimaslax?ref_src=twsrc%5Etfw">Tweets by alimaslax</a>
                  </li>
                </ul>
              </div>
            </aside>
          </Slide>
        </div>
        <ul className="copyright">
          <li>&copy; Copyright 2022 Maslax Ali</li>
          <li>
            Design by{" "}
            <a title="Styleshout" href="https://github.com/tbakerx">
              tbakerx
            </a>
          </li>
        </ul>
      </section>
    );
  }
  verifyRecaptchaCallback = (token) => {
    const data = {
      token: token
    }
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch("https://alimaslax.com:3006/verify", requestMetadata)
      .then((res) =>
        res.json()
      )
      .then(response => {
        this.setState({ isRobot: !response.success });
      });
  };

  handleChange = (evt) => {
    const val = evt.target.value;
    this.setState({
      [evt.target.name]: val
    });
  }

  sendEmail = () => {

    if (this.state.contactName.length < 3 ||
      this.state.contactEmail.length < 3 ||
      this.state.contactSubject.length < 3 ||
      this.state.contactMessage.length < 3) {
      $("#message-warning").fadeIn();
      return;
    }
    var data =
      "contactName=" +
      this.state.contactName +
      "&contactEmail=" +
      this.state.contactEmail +
      "&contactSubject=" +
      this.state.contactSubject +
      "&contactMessage=" +
      this.state.contactMessage;

    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify(this.state)
    };
    try {
      $("#image-loader").fadeIn();
      fetch("https://alimaslax.com:3006/send", requestMetadata)
        .then(res => res.json())
        .then(response => {
          this.setState({ isRobot: true });
          if ($("#message-warning")) {
            $("#message-warning").fadeOut();
          }
          $("#image-loader").fadeOut();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();
          //this.setState({ response: "okay" });
        });
    }
    catch (error) {
      this.setState({ isRobot: true });
      console.log("error")
    }

  }
}

export default Contact;

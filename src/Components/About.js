import React, { Component } from "react";
import Fade from "react-reveal";

class About extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const profilepic = "images/" + this.props.data.image;
    const bio = this.props.data.bio;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const phone = this.props.data.phone;
    const email = this.props.data.email;
    const resumeDownload = this.props.data.resumedownload;
    const project = this.props.data.project;
    const github = this.props.data.github;
    const description = this.props.data.description;

    return (
      <section id="about">
        <Fade duration={1000}>
          <about>
            <div className="row">
              <div className="banner-text">
                <Fade bottom>
                  <h1 className="responsive-headline">{name}</h1>
                </Fade>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="three columns">
                <img
                  className="profile-pic"
                  src={profilepic}
                  alt="Profile Pic"
                />
              </div>
              <div className="nine columns main-col">
                <h2>About Me</h2>
                <p>{description}</p>
                <p>{bio}</p>
                <div className="row">
                  <div className="columns contact-details">
                    <h2>Contact Details</h2>
                    <p className="address">
                      <span>{name}</span>
                      <br />
                      <span>
                        {city}, {state}
                      </span>
                      <br />
                      <span>{phone}</span>
                      <br />
                      <span>{email}</span>
                    </p>
                  </div>
                  <div className="columns download">
                    <p>
                      <a href={resumeDownload} className="button">
                        <i className="fa fa-download"></i>Download Resume
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Fade bottom duration={2000}>
                <ul className="social">
                  <div className="center-align">
                    <a href={project} className="button btn project-btn" style={{ width: "250px", fontSize: "30px" }}>
                      <i className="fa fa-book"></i> LinkedIn
                    </a>
                  </div>
                  <div className="center-align">
                    <a href={github} className="button btn github-btn" style={{ width: "250px", fontSize: "30px" }}>
                      <i className="fa fa-github"></i> Github
                    </a>
                  </div>
                </ul>
              </Fade>
            </div>
          </about>
        </Fade>
      </section>
    );
  }
}

export default About;

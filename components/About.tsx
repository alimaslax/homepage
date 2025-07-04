import React, { useState, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import ProfileCard from "./ProfileCard"; // Assuming ProfileCard is correctly imported
import Threads from "./Threads";

export default function About(props) {
  const [visible, setVisible] = useState(false);
  const [sensorActive, setSensorActive] = useState(false);
  useEffect(() => {
    if (visible) {
      setSensorActive(true);
    }
  }, [visible]);

  const name = props.name;
  const profilepic = "images/" + props.image; // Ensure this path is correct!
  const macbookPic = "images/macbook.png"; // Ensure this path is correct!
  const bio = props.bio;
  const city = "Columbus"; //props.address.city;
  const state = "Ohio"; //props.address.city; props.address.state;
  const phone = props.phone;
  const email = props.email;
  const resumeDownload = props.resumedownload;
  const project = props.project;
  const github = props.github;
  const description = props.description;

  return (
    <section id="about">
      <div className="about">
        <div className="banner-text">
          <div style={{ height: "600px", width:'100%', top: -200, position: "absolute" }}>
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction
            />
          </div>
          <h1 className="responsive-headline">{name}</h1>
          <hr />
        </div>

        {/* Main content layout: Profile on left, Text on right */}
        <div
          className="about-main-content" // Custom class for this section
          style={{
            display: "flex",
            justifyContent: "center", // Center the entire layout block
            alignItems: "flex-start", // Align items at the top
            gap: "40px", // Space between profile and text
            flexWrap: "wrap", // Allow wrapping for responsiveness
            maxWidth: "1100px", // Limit the overall width
            margin: "0 auto", // Center the container
            padding: "0 20px", // Add some side padding
          }}
        >
          {/* Profile Card Column */}
          <div
            className="profile-card-wrapper" // Wrapper for the profile card
            style={{
              flex: "0 0 300px", // Fixed width for the profile card area
              maxWidth: "300px", // Ensure it doesn't exceed this width
              boxSizing: "border-box", // Include padding/border in width
              marginRight: 100,
            }}
          >
            {/* The ProfileCard component itself */}
            <ProfileCard
              name="" // You might want to pass the actual name here if ProfileCard uses it
              title="Software Engineer"
              handle="alimaslax"
              status="Online"
              contactText="Contact Me"
              avatarUrl={profilepic}
              showUserInfo={false}
              enableTilt={true}
              onContactClick={() => console.log("Contact clicked")}
              showBehindGradient={false}
            />
          </div>

          {/* Text Content Column */}
          <div
            className="text-content-wrapper" // Wrapper for the text content
            style={{
              flex: "1", // Allow this section to grow and take available space
              minWidth: "300px", // Minimum width before wrapping
              boxSizing: "border-box",
            }}
          >
            <h2>About Me</h2>
            <p>{description}</p>
            <p>{bio}</p>

            {/* Contact Details and Download Button */}
            <div
              className="contact-and-download-section"
              style={{
                display: "flex",
                flexDirection: "column", // Stack vertically
                gap: "20px", // Space between elements
                marginTop: "20px", // Space above this section
              }}
            >
              <div className="contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>{name}</span>
                  <br />
                  <span>
                    {city}, {state}
                  </span>
                  <span>{phone}</span>
                  <br />
                  <span>{email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

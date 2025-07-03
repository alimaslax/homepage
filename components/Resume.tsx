import React from "react";
import { animated, useSpring } from "@react-spring/web";

export default function Resume(props) {
  const slideInFromLeft = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(-100%, 0, 0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    },
    config: {
      duration: 800,
    },
  });

  if (!props) return null;
  let count = 0;
  function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const skillmessage = props.skillmessage;
  const education = props.education.map(function (education) {
    return (
      <div key={education.school}>
        <h3>{education.school}</h3>
        <p className="info">
          {education.degree} <span>&bull;</span>
          <em className="date">{education.graduated}</em>
        </p>
        <p>{education.description}</p>
      </div>
    );
  });

  const volunteer = props.volunteer.map(function (volunteer) {
    return (
      <div key={volunteer.org}>
        <h3>{volunteer.org}</h3>
        <p className="info">
          {volunteer.position} <span>&bull;</span>
          <em className="date">{volunteer.dates}</em>
        </p>
        <p>{volunteer.description}</p>
      </div>
    );
  });

  const work = props.work.map(function (work) {
    return (
      <div key={work.company}>
        <h3>{work.company}</h3>
        <p className="info">
          {work.title}
          <span>&bull;</span> <em className="date">{work.years}</em>
        </p>
        {work.description.map((text) => (
          <p>{text}</p>
        ))}
        <br />
      </div>
    );
  });

  const skills = props.skills.map((skills) => {
    const backgroundColor = getRandomColor();
    const className = "bar-expand " + skills.name.toLowerCase();
    const width = skills.level;

    return (
      <li key={skills.name}>
        <span style={{ width, backgroundColor }} className={className}></span>
        <em>{skills.name}</em>
      </li>
    );
  });

  return (
    <section id="resume">
      <animated.div style={slideInFromLeft}>
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{education}</div>
            </div>
          </div>
        </div>
      </animated.div>

      <animated.div style={slideInFromLeft}>
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Volunteer</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{volunteer}</div>
            </div>
          </div>
        </div>
      </animated.div>

      <animated.div style={slideInFromLeft}>
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>
      </animated.div>

      <animated.div style={slideInFromLeft}>
        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <p>{skillmessage}</p>

            <div className="bars">
              <ul className="skills">{skills}</ul>
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
}

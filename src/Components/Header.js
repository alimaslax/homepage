import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import About from "./About";
import Resume from "./Resume";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {

  render() {
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      // body: "./img/icon.png", // Whether to render pictures
      // rotate: [0, 20],
      alpha: [0.6, 0],
      scale: [1, 0.1],
      position: "center", // all or center or {x:1,y:1,width:100,height:100}
      color: ["random", "#ff0000"],
      cross: "dead", // cross or bround
      random: 15,  // or null,
      g: 5,    // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      }
    };

    if (!this.props.data) return null;

    const project = this.props.data.project;
    const github = this.props.data.github;
    const name = this.props.data.name;
    const description = this.props.data.description;

    return (
      <header class="home">
        <ParticlesBg num={10} color="#ADD8E6" type="cobweb" bg={false} />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">

            <li className="current">
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/resume">Resume</Link>
            </li>

            <li>
              <Link to="/notebook">Notebook</Link>
            </li>

            <li>
              <Link to="/projects">Projects</Link>
            </li>

            <li>
              <Link to="/contact">Contact Me</Link>
            </li>

          </ul>
        </nav>


      </header>
    );
  }
}

export default Header;

import React, { Component } from "react";
import ParticlesBg from "particles-bg";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.init();
    // state modifying func need to be bound
    this.closePan = this.closePan.bind(this);
  }
  init() {
    // Always set the initial state in its own function, so that
    // you can trivially reset your components at any point.
    this.state = {
      isOpen: true
    };
  }
  closePan() {
    console.log("Got here");
    this.setState(
      prevState => {
        return {
          isOpen: !prevState.isOpen
        };
      },
      () => console.log(this.state));
  }

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
          <a onClick={this.closePan} className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a onClick={this.closePan} className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          {!this.state.isOpen ? <ul id="nav" className="nav">

            <li className="current">
              <Link onClick={this.closePan} to="/">Home</Link>
            </li>

            <li>
              <Link onClick={this.closePan} to="/resume">Resume</Link>
            </li>

            <li>
              <Link onClick={this.closePan} to="/notebook">Notebook</Link>
            </li>

            <li>
              <Link onClick={this.closePan} to="/projects">Social 📸</Link>
            </li>

            <li>
              <Link onClick={this.closePan} to="/contact">Contact Me</Link>
            </li>

          </ul> : null}
        </nav>


      </header>
    );
  }
}

export default Header;

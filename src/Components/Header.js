import React, { Component } from "react";
import ParticlesBg from "particles-bg";

import {
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
      isOpen: window.innerWidth > 767 ? true : false,
    };
  }
  closePan() {
    this.setState(
      prevState => {
        return {
          isOpen: window.innerWidth > 767 ? true : !prevState.isOpen,
        };
      },
      () => console.log(this.state));
  }

  render() {
    if (!this.props.data) return null;

    const project = this.props.data.project;
    const github = this.props.data.github;
    const name = this.props.data.name;
    const description = this.props.data.description;
    return (
      <header class="home">
        <ParticlesBg num={10} color="#ADD8E6" type="cobweb" bg={false} />

        <nav id="nav-wrap">
          <a onClick={this.closePan} className="mobile-btn" title="Show navigation">
            Show navigation
          </a>
          <a onClick={this.closePan} className="mobile-btn" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav" style={{ display: this.state.isOpen ? 'block' : 'none' }}>
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
              <Link to="/projects">Social 📸</Link>
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

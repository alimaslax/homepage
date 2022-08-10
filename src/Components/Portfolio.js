import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";
import Button from 'react-bootstrap/Button';
import { ProGallery } from 'pro-gallery';
import 'pro-gallery/dist/statics/main.css';

let id = 0;
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.init();
  }
  init() {
    // Always set the initial state in its own function, so that
    // you can trivially reset your components at any point.
    this.state = {
      changeSize: window.innerWidth < 1000 ? 500 : 1025
    };
    //this.setState({ changeSize: this.state.changeSize + 300 })}
  }
  render() {
    if (!this.props.data) return null;
    // Add your images here...


    // The options of the gallery (from the playground current state)
    const options_notes = {
      layoutParams: {
        structure: {
          galleryLayout: -1,
          scrollDirection: "HORIZONTAL",
        },
        groups: {
          groupSize: 0
        }

      }
    };
    const container_notes = {
      width: this.state.changeSize,
      height: 300
    };

    const options_videos = {
      layoutParams: {
        structure: {
          galleryLayout: -1,
          enableStreching: false,
        },
        groups: {
          groupSize: 1
        }
      }
    };
    // The size of the gallery container. The images will fit themselves in it
    const container = {
      width: this.state.changeSize,
      height: 300
    };

    // The eventsListener will notify you anytime something has happened in the gallery.
    const eventsListener = (eventName, eventData) => console.log({ eventName, eventData });

    // The scrollingElement is usually the window, if you are scrolling inside another element, suplly it here
    const scrollingElement = window;

    const projects = this.props.data.projects.map(function (projects) {
      let projectImage = "images/portfolio/" + projects.image;
      return (
        <div key={id++} className="columns portfolio-item">
          <div className="item-wrap">
            <img alt={projects.title} src={projectImage} />
            <div style={{ textAlign: "center" }}>{projects.title}</div>
          </div>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>PyTorch Notes</h1>

              <div className="portfolio-wrapper">
                <ProGallery
                  items={this.props.data.notes}
                  options={options_notes}
                  container={container_notes}
                  eventsListener={eventsListener}
                  scrollingElement={scrollingElement}
                />
              </div>

            </div>
            <div className="twelve columns collapsed">
              <h1>PyTorch Notes</h1>

              <div
                id="portfolio-wrapper"
                className="video-wrapper bgrid-thirds s-bgrid-thirds cf"
              >
                <ProGallery
                  items={this.props.data.videos}
                  options={options_videos}
                  container={container}
                  eventsListener={eventsListener}
                  scrollingElement={scrollingElement}
                />
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;

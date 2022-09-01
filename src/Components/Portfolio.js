import React, { Component } from "react";
import Fade from "react-reveal";
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
      winSize: window.innerWidth < 1000 ? 500 : 1025,
      displayBoarder: false
    };
    //this.setState({ winSize: this.state.winSize + 300 })}
  }
  render() {
    if (!this.props.data) return null;

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
                {this.props.data.notes.map((item) => {
                  return <div className="portfolio-item">
                    <a href={item.metaData.link.url} target="_blank">
                      <img
                        src={item.mediaUrl}
                        alt={item.metaData.description}
                      />
                    </a>
                  </div>

                })
                }
              </div>

            </div>
            <div className="twelve columns collapsed">
              <h1>PyTorch Notes</h1>

              <div
                id="portfolio-wrapper"
                className="video-wrapper bgrid-thirds s-bgrid-thirds cf"
              >
                {this.props.data.videos.map((item) => {
                  return <div className="portfolio-item">
                    <a href={item.metaData.link.url} target="_blank">
                      <img
                        src={item.mediaUrl}
                        alt={item.metaData.description}
                      />
                    </a>
                  </div>
                })
                }
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;

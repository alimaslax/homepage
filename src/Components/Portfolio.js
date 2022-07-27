import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let id = 0;
class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      iframe: "jupyter/Convolutional.html",
      iframe_key: 0,
    }
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
    const openIFrame = (name) => {
      let filename = "";
      switch (name) {
        case 'data':
          filename = "jupyter/Convolutional.html";
          break;
        case 'digit':
          filename = "jupyter/DigitClassification.html";
          break;
        case 'fullyconnected':
          filename = "jupyter/FullyConnected.html";
          break;
      }
      this.setState({
        iframe: filename,
        iframe_key: this.state.iframe_key + 1
      })
    }
    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <div
                id="portfolio-wrapper"
                className="bgrid-thirds s-bgrid-thirds cf"
              >
                <Container>
                  <Row className="chapters">
                    <Col><Button onClick={() => openIFrame("data")}>Data Classification</Button></Col>
                    <Col xs={2}><Button onClick={() => openIFrame("digit")}>Digit Classification MNST</Button></Col>
                    <Col><Button onClick={() => openIFrame("fullyconnected")}>Fully Connected NN</Button></Col>
                  </Row>
                </Container>

                <iframe
                  hidden={false}
                  src={this.state.iframe}
                  key={this.state.iframe_key}
                  width="100%"
                  height="800px"
                  sandbox=''>
                </iframe>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;

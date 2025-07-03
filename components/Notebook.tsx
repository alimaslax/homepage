import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

let id = 0;

export default function Notebook(props) {
  const { data: session } = useSession();

  let button;
  if (!props) return null;
  const projects = props.projects.map(function (projects) {
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
  if (session) {
    button = (
      <button className="btn btn-secondary popup-modal" onClick={()=> signOut}>
        Logout
      </button>
    );
  } else {
    button = (
      <button className="btn btn-primary popup-modal" onClick={() => signIn}>
        Login
      </button>
    );
  }
  return (
    <section id="portfolio">
        {}
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>PyTorch Notes</h1>

            <div className="portfolio-wrapper">
              {props.notes.map((item) => {
                return (
                  <div className="portfolio-item">
                    <a href={item.metaData.link.url} target="_blank">
                      <img
                        src={item.mediaUrl}
                        alt={item.metaData.description}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>PyTorch/ML Videos</h1>
            <div
              id="portfolio-wrapper"
              className="bgrid-thirds s-bgrid-thirds cf"
            >
              {props.videos.map((item) => {
                return (
                  <div className="portfolio-item">
                    <a href={item.metaData.link.url} target="_blank">
                      <img
                        src={item.mediaUrl}
                        alt={item.metaData.description}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="portfolio-container">{button}</div>
    </section>
  );
}

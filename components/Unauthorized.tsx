import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

let id = 0;

export default function Unauthorized(props) {
  const [winSize, setWinSize] = useState(1024 < 1000 ? 500 : 1025);
  const [displayBoarder, setDisplayBoarder] = useState(false);
  const slideInFromBottom = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(0, 100%, 0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    },
    config: {
      duration: 500,
    },
  });
  if (!props) return null;

  return (
    <section id="resume">
      <animated.div style={slideInFromBottom}>
        <div className="row education">
          <div className="center-align header-col">
            <h1>
              <span>Notebook</span>
            </h1>
          </div>
        </div>
        <div className="row education signIn">
          Hey There, looks like you reached an area you don't have access to.
          Please sign in here.
          <button
            className="popup-modal"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </button>
        </div>
      </animated.div>
    </section>
  );
}

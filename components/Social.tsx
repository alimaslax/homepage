import { animated, useSpring } from "@react-spring/web";
import React from "react";

export default function SocialView(props) {
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

  const networks = props.social.map(function (network) {
    return (
      <li key={network.name}>
        <a href={network.url}>
          <i className={network.className}></i>
        </a>
      </li>
    );
  });

  return (
    <footer>
      <div className="row">
          <div className="twelve columns">
            <ul className="social-links">{networks}</ul>
          </div>
      </div>
    </footer>
  );
}

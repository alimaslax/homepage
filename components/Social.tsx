import React from "react";

export default function SocialView(props) {
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

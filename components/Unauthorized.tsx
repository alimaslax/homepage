import { signIn } from "next-auth/react";
import React from "react";

export default function Unauthorized(props) {
  if (!props) return null;

  return (
    <section id="resume">
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
    </section>
  );
}

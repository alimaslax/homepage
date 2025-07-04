import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import ChromaGrid from "./ChromaGrid";

const notes = [
  {
    image: "images/portfolio/convolutional.jpeg",
    title: "Convolutional",
    subtitle: "PDF Note",
    handle: "",
    borderColor: "#F43F5E",
    gradient: "linear-gradient(145deg, #F43F5E, #000)",
    url: "https://github.com/alimaslax/homepage/raw/feature/MALI-01/public/jupyter/Convolutional.pdf",
  },
  {
    image: "images/portfolio/DigitClassification.jpeg",
    title: "DigitClassification",
    subtitle: "PDF Note",
    handle: "",
    borderColor: "#0EA5E9",
    gradient: "linear-gradient(145deg, #0EA5E9, #000)",
    url: "https://github.com/alimaslax/homepage/raw/feature/MALI-01/public/jupyter/Convolutional.pdf",
  },
  {
    image: "images/portfolio/FullyConnected.jpeg",
    title: "FullyConnected",
    subtitle: "PDF Note",
    handle: "",
    borderColor: "#A855F7",
    gradient: "linear-gradient(145deg, #A855F7, #000)",
    url: "https://github.com/alimaslax/homepage/raw/feature/MALI-01/public/jupyter/Convolutional.pdf",
  },
];
const videos = [
  {
    image: "images/portfolio/pytorch.jpeg",
    title: "PythonEngineer",
    subtitle: "Full PyTorch Course",
    handle: "",
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #000)",
    url: "https://www.youtube.com/watch?v=c36lUUr864M&t=9s&ab_channel=PythonEngineer",
  },
  {
    image: "images/portfolio/learning.jpeg",
    title: "TheAIEpiphany",
    subtitle: "How to Learn ML",
    handle: "",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://www.youtube.com/watch?v=7q_OJvQQ7vY&t=437s&ab_channel=TheAIEpiphany",
  },
  {
    image: "images/portfolio/neural_networks.jpeg",
    title: "3Blue1Brown",
    subtitle: "Neural Networks",
    handle: "",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #000)",
    url: "https://www.youtube.com/watch?v=aircAruvnKk&t=706s",
  },
  {
    image: "images/portfolio/projects.jpeg",
    title: "TheAIEpiphany",
    subtitle: "ML Projects for Beginners",
    handle: "",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(145deg, #F59E0B, #000)",
    url: "https://www.youtube.com/watch?v=yhhSYk9zt1w&t=2s&ab_channel=TheAIEpiphany",
  },
  {
    image: "images/portfolio/vectors.jpeg",
    title: "3Blue1Brown",
    subtitle: "Vectors Intuition",
    handle: "",
    borderColor: "#10B981",
    gradient: "linear-gradient(145deg, #10B981, #000)",
    url: "https://www.youtube.com/watch?v=fNk_zzaMoSs&t=23s&ab_channel=3Blue1Brown",
  },
  {
    image: "images/portfolio/vectors2.jpeg",
    title: "3Blue1Brown",
    subtitle: "Span & Linear Algebra",
    handle: "",
    borderColor: "#EC4899",
    gradient: "linear-gradient(145deg, #EC4899, #000)",
    url: "https://www.youtube.com/watch?v=k7RM-ot2NWY&t=515s&ab_channel=3Blue1Brown",
  },
  {
    image: "images/portfolio/full_day_pytorch.jpeg",
    title: "DanielBourke",
    subtitle: "Full Day PyTorch Tutorial",
    handle: "",
    borderColor: "#6366F1",
    gradient: "linear-gradient(145deg, #6366F1, #000)",
    url: "https://www.youtube.com/watch?v=Z_ikDlimN6A&t=19185s&ab_channel=DanielBourke",
  },
  {
    image: "images/portfolio/gradients.jpeg",
    title: "3Blue1Brown",
    subtitle: "How Machines Learn",
    handle: "",
    borderColor: "#F97316",
    gradient: "linear-gradient(145deg, #F97316, #000)",
    url: "https://www.youtube.com/watch?v=IHZwWFHWa-w&ab_channel=3Blue1Brown",
  },
  {
    image: "images/portfolio/sebastian.jpeg",
    title: "SebastianLague",
    subtitle: "ML from Scratch",
    handle: "",
    borderColor: "#14B8A6",
    gradient: "linear-gradient(145deg, #14B8A6, #000)",
    url: "https://www.youtube.com/watch?v=hfMk-kjRv4c&t=183s&ab_channel=SebastianLague",
  },
];



export default function Notebook(props) {
  const { data: session } = useSession();

  let button;
  if (!props) return null;

  if (session) {
    button = (
      <button className="btn btn-secondary popup-modal" onClick={() => signOut}>
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
          <div style={{ height: "600px", position: "relative" }}>
            <ChromaGrid
              items={notes}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
          <br />
          <h1>Neural Networks Videos</h1>
          <div style={{ height: "600px", position: "relative" }}>
            <ChromaGrid
              items={videos}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

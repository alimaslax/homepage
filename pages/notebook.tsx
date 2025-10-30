// pages/notebook.tsx (or .jsx)
import { default as NotesComp } from "../components/Notebook";
import Unauthorized from "../components/Unauthorized"; // (unused below, keep if you plan to gate by session)
import handler from "../server/api/resume";
import { useSession } from "next-auth/react";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type NotebookProps = {
  resume: any;
  readme: string;
};

export default function Notebook({ resume, readme }: NotebookProps) {
  const { data: session } = useSession();

  // If you want to gate access, uncomment:
  // if (!session) return <Unauthorized />;

  // Your existing content
  const notesContent = <NotesComp {...resume.portfolio} />;

  return (
    <div
      className="App"
      style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}
    >
      {notesContent}

      {/* Divider / heading for the README section */}
      <hr style={{ margin: "2rem 0" }} />
      <h2 style={{ margin: "0 0 1rem" }}>Project README</h2>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          img: (props) => (
            <img
              {...props}
              alt={props.alt ?? ""}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ),
          code: ({ inline, className, children, ...rest }) =>
            inline ? (
              <code className={className} {...rest}>
                {children}
              </code>
            ) : (
              <pre className={className} {...rest}>
                <code>{children}</code>
              </pre>
            ),
        }}
      >
        {readme}
      </ReactMarkdown>
    </div>
  );
}

// Build-time data fetching
export async function getStaticProps() {
  // 1) Your existing resume fetch
  const res = await handler();
  const json = JSON.parse(res);

  // 2) Load README.md from the repo root
  // NOTE: This runs on the server at build time, so it's safe to use 'fs' here.
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const readmePath = path.join(process.cwd(), "README.md");
  let readme = "";
  try {
    readme = await fs.readFile(readmePath, "utf8");
  } catch (e) {
    // Fall back gracefully if README is missing
    readme = "# README not found\n\nNo README.md at project root.";
  }

  return {
    props: {
      resume: json,
      readme,
    },
  };
}

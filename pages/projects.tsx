import { default as ProjectsView } from "../components/Projects";
import path from "path";
import { promises as fs } from "fs";

export default function ProjectsPage({ projects }) {
  return (
    <div className="App">
      <ProjectsView projects={projects} />
    </div>
  );
}

export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(
    jsonDirectory + "/projectsData.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);
  return {
    props: {
      projects: data.projects,
    },
  };
}

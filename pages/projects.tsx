import { default as ProjectsView } from "../components/Projects";
import path from "path";
import { promises as fs } from "fs";

export default function ProjectsPage({ groups }) {
  return (
    <div className="App">
      <ProjectsView groups={groups} />
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
      groups: data.groups,
    },
  };
}

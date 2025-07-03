import path from "path";
import { promises as fs } from "fs";
const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";

export default async function handler() {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "data");
  //Read the json data file resumeData.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/resumeData.json",
    "utf8"
  );
  //Return the content of the data file in json format
  return fileContents;
}

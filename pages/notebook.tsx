import { default as NotesComp } from "../components/Notebook";
import Unauthorized from '../components/Unauthorized';
import handler from "../server/api/resume";
import { useSession } from "next-auth/react";

export default function Notebook({ resume }) {
  const { data: session } = useSession()
  var content = session ? <NotesComp {...resume.portfolio} /> : <Unauthorized></Unauthorized>;
  return <div className="App">{content}</div>;
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const res = await handler();
  const json = JSON.parse(res);
  return {
    props: {
      resume: json,
    },
  };
}

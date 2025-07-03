import { default as ResumeView } from "../components/Resume";
import handler from "../server/api/resume";
import { useRouter } from "next/router";

export default function Resume({ resume }) {
  const { pathname } = useRouter();
  return (
    <div className="App">
      <ResumeView {...resume.resume} />
    </div>
  );
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

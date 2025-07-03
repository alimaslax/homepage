import { default as SocialView } from "../components/Social";
import handler from "../server/api/resume";
import { useRouter } from "next/router";

export default function Social({ resume }) {
  const { pathname } = useRouter();
  return (
    <div className="App">
      <SocialView {...resume.main} />
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

import { default as ContactComp } from "../components/Contact";
import handler from "../server/api/resume";
import { useEffect } from "react";
import useSiteStore from "../store/useSiteStore";

interface ContactProps {
  siteKey: string;
  contact: {
    name?: string;
    [key: string]: any;
  };
}

export default function Contact(props: ContactProps) {
  const { profile, setApiKey, setResume } = useSiteStore();

  useEffect(() => {
    setApiKey(props.siteKey);
    if (!profile?.name) {
      setResume({ profile: props.contact });
    }
  }, [profile?.name, props.siteKey, props.contact, setApiKey, setResume]);

  return (
    <div className="App">
      <ContactComp {...props} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await handler();
  const json = JSON.parse(res);
  const props: ContactProps = {
    contact: { ...json.main },
    siteKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_RECAPTCHAKEY || "",
  };
  return { props };
}
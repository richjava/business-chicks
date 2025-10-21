import { NextStudio } from "next-sanity/studio";
import config from "./../../sanity/sanity.config";

const Studio = () => {
  return <NextStudio config={config} />;
};

export default Studio;

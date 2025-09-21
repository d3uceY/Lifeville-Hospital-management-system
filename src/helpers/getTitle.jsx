import { useEffect } from "react";
import { title as constTitle } from "../lib/constants";

export const GetTitle = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - ${constTitle}`;
  }, [title]);

  return null; // don’t actually render a <title> tag here
};

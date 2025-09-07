import { useEffect, useState } from "react";

export function UseFunTitle() {
  const [title, setTitle] = useState("Lifeville Hospital Management System");

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTitle("😈 Come back, lil Nigga");
      } else {
        setTitle("Lifeville Hospital Management System");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <title>{title}</title>;
}

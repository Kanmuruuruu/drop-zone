import React, { useState } from "react";
import ProgressBar from "./ArianeFil/ProgressBar";
import Files from "./Files";
import "./Content.css";

const Content = () => {
  const [progress, setProgress] = useState(-1);

  const [progressBar, setProgressBar] = useState([
    {
      text: "Login",
      done: false,
      component: <Files />
    },
    { text: "Créer un nouveau patient", done: false },
    {
      text: "Files",
      done: false,
      component: <Files />
    },
    { text: "Complete", done: false }
  ]);

  const handleNext = () => {
    if (progress < progressBar.length - 1) {
      progressBar[progress + 1].done = true;
      setProgress(progress + 1);
      setProgressBar([...progressBar]);
    }
  };
  return (
    <div className="App">
      <ProgressBar
        progressBar={progressBar}
        changeProgressBar={setProgressBar}
        changeProgress={setProgress}
      />

      {progressBar.map((item, index) => {
        return index === progress + 1 && item.component ? item.component : null;
      })}
      <div className="buttonNext" onClick={handleNext}>
        Next
      </div>
    </div>
  );
};

export default Content;

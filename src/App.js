import React, { useState } from "react";
import Dropzone from "./components/Dropzone";
import "./App.css";
import ProgressBar from "./components/ArianeFil/ProgressBar";

const App = () => {
  const [progressBar, setProgressBar] = useState([
    { text: "Login", done: false },
    { text: "bien joué", done: false },
    { text: "oups", done: false },
    { text: "last", done: false }
  ]);

  return (
    <div className="App">
      <ProgressBar progressBar={progressBar} changeProgress={setProgressBar} />
      <div className="Card">
        <Dropzone urlToUpload={"http://localhost:8000/upload-files"} />
      </div>
    </div>
  );
};

export default App;

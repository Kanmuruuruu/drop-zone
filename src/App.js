import React, { useState } from "react";
import Dropzone from "./components/Dropzone";
import "./App.css";
import ProgressBar from "./components/ArianeFil/ProgressBar";

const App = () => {
  const [progressBar, setProgressBar] = useState([
    { text: "Login", done: false },
    { text: "Créer un nouveau patient", done: false },
    { text: "Files", done: false },
    { text: "Complete", done: false }
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

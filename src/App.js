import React from "react";
import Dropzone from "./components/Dropzone";
import "./App.css";

const App = () => {

  return (
    <div className="App">
      <div className="Card">
        <Dropzone urlToUpload={"http://localhost:8000/upload-files"} />
      </div>
    </div>
  );
};

export default App;

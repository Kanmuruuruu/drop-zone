import React from "react";
import Dropzone from "./components/Dropzone";
import "./App.css";

const App = () => {

  return (
    <div className="App">
      <div className="Card">
        <Dropzone onFilesAdded={console.log} />
      </div>
    </div>
  );
};

export default App;

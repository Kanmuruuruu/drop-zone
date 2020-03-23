import React, { useState } from "react";
import "./Dropzone.css";
import FileZone from "./FileZone";

const Dropzone = ({ onFilesAdded, disabled = false }) => {
  const [highlight, setHighlight] = useState(false);

  const [files, setFiles] = useState([]);

  const fileInputRef = React.createRef();

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const onAdd = evt => {
    if (disabled) return;
    const files = evt.target.files;
    const array = fileListToArray(files);
    onFilesAdded(array);
    setFiles(array);
  };

  const onDragOver = evt => {
    evt.preventDefault();
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = event => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    // to put the data in the input, for the formData.
    const input = document.getElementById("inputZip");
    input.files = files;
    const array = fileListToArray(files);
    setFiles(array);
    setHighlight(false);
  };

  const fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  const deleteFile = id => {
    files.splice(id, 1);
    setFiles([...files]);
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8000/upload-files");
    request.send(form);
    request.onload = () => {
      if (request.status === 201) {
        console.log("Congrats");
      } else {
        console.log("Oups");
      }
    };
  };

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data" method="POST">
        <div
          className={`Dropzone ${highlight ? "Highlight" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openFileDialog}
          style={{ cursor: "pointer" }}
        >
          <img src={require("../assets/images/upload.png")}className="Icon" alt="upload Image" />
          <input
            ref={fileInputRef}
            className="FileInput"
            name="filesInput"
            type="file"
            multiple
            id="inputZip"
            onChange={onAdd}
          />
          <span>Upload Files</span>
        </div>
        <input type="submit" value="Envoyer" />
      </form>
      <div>
        {files.map((file, index) => (
          <FileZone index={index} file={file} deleteFile={deleteFile} />
        ))}
      </div>
    </div>
  );
};

export default Dropzone;

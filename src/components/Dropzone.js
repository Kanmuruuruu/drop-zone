import React, { useState } from "react";
import "./Dropzone.css";
import FileZone from "./FileZone";

const Dropzone = () => {
  const [highlight, setHighlight] = useState(false);

  const [files, setFiles] = useState([]);

  const fileInputRef = React.createRef();

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onAdd = e => {
    const filesTransfer = e.target.files;
    const array = fileListToArray(filesTransfer);
    setFiles([...files, ...array]);
  };

  const onDragOver = e => {
    e.preventDefault();
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = event => {
    event.preventDefault();
    const filesTransfer = event.dataTransfer.files;
    const array = fileListToArray(filesTransfer);
    setFiles([...files, ...array]);
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
    setFiles([...files])
  };

  const onSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    files.map(file => form.append("filesInput", file));

    console.log('fetch');
    const response  = await fetch("http://localhost:8000/upload-files", {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001'
      },
      body: form
    });
    console.log(await response.json());
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
          <img src={require("../assets/images/upload.png")} className="Icon" alt="upload files" />
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

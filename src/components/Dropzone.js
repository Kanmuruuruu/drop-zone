import React, { useState } from "react";
import "./Dropzone.css";
import FileZone from "./FileZone";
import Modal from "./Modal/Modal";

const Dropzone = ({ urlToUpload }) => {
  const [highlight, setHighlight] = useState(false);

  const [files, setFiles] = useState([]);

  const [message, setMessage] = useState({});

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
    setFiles([...files]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (files.length === 0) return false;
    const form = new FormData();
    files.map(file => form.append("filesInput", file));
    const response = await fetch(urlToUpload, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001"
      },
      body: form
    });
    const messageFetch = await response.json();
    console.log(messageFetch);
    setMessage(messageFetch);
    toggleModal();
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Modal
        show={showModal}
        closeCallback={toggleModal}
        customClass="custom_modal_class"
        success={message.status}
      >
        <React.Fragment>
          {message.message}
        </React.Fragment>
      </Modal>
      <form
        className="formDropzone"
        onSubmit={onSubmit}
        encType="multipart/form-data"
        method="POST"
      >
        <div
          className={`Dropzone ${highlight ? "Highlight" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openFileDialog}
        >
          <img
            src={require("../assets/images/upload.png")}
            className="Icon"
            alt="upload files"
          />
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

import React from 'react';
import Dropzone from "./Dropzone";

const Files = () => {
  return (
    <div className="Card">
      <Dropzone urlToUpload={"http://localhost:8000/upload-files"} />
    </div>
  );
};

export default Files;

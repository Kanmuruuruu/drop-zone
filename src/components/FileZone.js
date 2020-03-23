import React from 'react';

const FileZone = ({file, deleteFile, index}) => {
  return (
    <div>
      {file.name}
      <div onClick={() => deleteFile(index)} style={{ backgroundColor: "blue"}}>
        delete
      </div>
    </div>
  );
};

export default FileZone;

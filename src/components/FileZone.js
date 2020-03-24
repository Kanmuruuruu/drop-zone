import React from 'react'

const styleInput = {
  backgroundColor: "blue",
  color: 'black',
  borderRadius: '20px',
  cursor: 'pointer'
};

const FileZone = ({file, deleteFile, index}) => {
  return (
    <div>
      {file.name}
      <div onClick={() => deleteFile(index)} style={styleInput}>
        delete
      </div>
    </div>
  );
};

export default FileZone;

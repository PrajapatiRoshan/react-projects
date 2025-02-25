import React, { useEffect, useState } from 'react';
import { checkDir, checkImg, getImgURL } from '../helper';

const Icons = ({ file, index, onDirSelect, onImgSelect, selectedImg }) => {
  const [imageUrl, setImageUrl] = useState();
  const fileIsDir = checkDir(file);
  useEffect(() => {
    const getURL = async () => {
      if ('name' in file && checkImg(file)) {
        const imgUrl = await getImgURL(file);
        setImageUrl(imgUrl);
      }
    };
    getURL();
  }, [file]);
  return (
    <div
      className={`fileStruct ${selectedImg === file?.name ? 'selected' : ''}`}
      key={fileIsDir ? file.dir.name : file.name}
    >
      <span>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={file.name}
            className="fileIcons pointerEnable"
            key={file.name}
            onClick={() => onImgSelect(index, file.name)}
          />
        ) : fileIsDir ? (
          <img
            src={'/images/folderIcon.png'}
            alt="folder"
            className="fileIcons pointerEnable"
            onDoubleClick={() => onDirSelect(file.id, file.dir.name)}
            key={file.dir.name}
          />
        ) : (
          <img
            src={'/images/filesIcon.png'}
            alt="file"
            className="fileIcons"
            key={file.name}
          />
        )}
      </span>
      <span className="fileName">{fileIsDir ? file.dir.name : file.name}</span>
    </div>
  );
};

export default Icons;

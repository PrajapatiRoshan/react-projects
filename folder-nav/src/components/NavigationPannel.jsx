import React, { useEffect, useState } from 'react';
import { checkImg, getImgURL } from '../helper';

const NavigationPannel = ({ file, nxt, prv, index, dirNav }) => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    const getURL = async () => {
      if ('name' in file && checkImg(file)) {
        const imgUrl = await getImgURL(file);
        setImageUrl(imgUrl);
      }
    };
    if (file) getURL();
  }, [file]);

  return (
    file && (
      <div className="pannel">
        <div key={file.name} className="navPannel">
          <img src={imageUrl} alt={file.name} className="fileIcons" />
          <span className="fileName">{file.name}</span>
        </div>
        <div className="btnContainer">
          <div className="horizontal">
            <img
              src={'/images/back.png'}
              alt={'back'}
              className="material-symbols-outlined pointerEnable left"
              key={'back'}
              onClick={() => prv(index)}
            />
            <img
              src={'/images/right.png'}
              alt={'right'}
              className="material-symbols-outlined pointerEnable right"
              key={'right'}
              onClick={() => nxt(index)}
            />
          </div>
          <div className="vertical">
            <img
              src={'/images/back.png'}
              alt={'top'}
              className="material-symbols-outlined pointerEnable up"
              key={'top'}
              style={{ transform: 'rotate(90deg)' }}
              onClick={() => dirNav(false)}
            />
            <img
              src={'/images/right.png'}
              alt={'bottom'}
              className="material-symbols-outlined pointerEnable down"
              key={'bottom'}
              style={{ transform: 'rotate(90deg)' }}
              onClick={() => dirNav(true)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default NavigationPannel;

import React, { useCallback, useContext, useEffect, useState } from 'react';
import Icons from './Icons';
import { FileContext } from '../store/FileContext';
import { getDisplayFiles, checkDir } from '../helper';
import NavigationPannel from './NavigationPannel';

const DisplayFiles = () => {
  const fileCtx = useContext(FileContext);
  const [displayFiles, setDisplayFiles] = useState([]);

  useEffect(() => {
    if (fileCtx?.fileState.path.length) {
      setDisplayFiles(getDisplayFiles(fileCtx.rootDir.files, fileCtx.fileState.path));
    } else if (fileCtx.fileState.currDir !== '' && fileCtx?.fileState.path.length === 0) {
      fileCtx.reset();
    }
  }, [fileCtx, fileCtx.fileState.path.length]);

  const dirSelectedHandler = (id, name) => {
    fileCtx.openDir({ id, name, length: displayFiles.length });
  };

  const imgSelectHandler = (idx, name) => {
    fileCtx.selectImg({ idx, name });
  };

  const proceedClick = () => {
    fileCtx.openNav();
  };

  const handlerNextImg = useCallback(
    (idx) => {
      let _index = idx;
      if (displayFiles.length - 1 === _index) {
        _index = 0;
      } else {
        _index += 1;
      }
      fileCtx.selectImg({ name: displayFiles[_index].name, idx: _index });
    },
    [displayFiles, fileCtx]
  );

  const handlerPrvImg = useCallback(
    (idx) => {
      let _index = idx;
      if (_index === 0) {
        _index = displayFiles.length - 1;
      } else {
        _index -= 1;
      }
      fileCtx.selectImg({ name: displayFiles[_index].name, idx: _index });
    },
    [displayFiles, fileCtx]
  );

  return (
    <>
      {fileCtx?.rootDir && (
        <div className="displayFiles">
          <div className="wrapper">
            <img
              src={'/images/back.png'}
              alt={'back'}
              className="material-symbols-outlined pointerEnable back"
              key={'back'}
              onClick={fileCtx.backTODir}
            />
            <div className="pathHeader">
              {fileCtx.fileState.path.map((e) => e.name).join('  >  ')}
            </div>
          </div>
          {!fileCtx.fileState.showNavPannel && (
            <div className="filesUI">
              {displayFiles.length ? (
                displayFiles.map((entry, i) => (
                  <Icons
                    file={entry}
                    key={checkDir(entry) ? entry.dir.name : entry.name}
                    index={i}
                    onDirSelect={dirSelectedHandler}
                    onImgSelect={imgSelectHandler}
                    selectedImg={
                      fileCtx.fileState.selectedImg
                        ? fileCtx.fileState.selectedImg.name
                        : ''
                    }
                  />
                ))
              ) : (
                <p style={{ fontSize: '30px' }}>No files</p>
              )}
            </div>
          )}
          {fileCtx.fileState.showNavPannel && (
            <NavigationPannel
              file={displayFiles[fileCtx.fileState.selectedImg.idx]}
              nxt={handlerNextImg}
              prv={handlerPrvImg}
              dirNav={fileCtx.dirNav}
              index={fileCtx.fileState.selectedImg.idx}
            />
          )}
          {fileCtx.fileState.selectedImg && !fileCtx.fileState.showNavPannel && (
            <button className="floating-button" onClick={proceedClick}>
              Proceed
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayFiles;

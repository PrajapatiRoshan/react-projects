import React, { useState } from 'react';
import { createContext } from 'react';
import { getAllFiles, getDirName } from '../helper';

export const FileContext = createContext({
  rootDir: undefined,
  fileState: {},
  dirPicker: () => {},
  openDir: () => {},
  selectFile: () => {},
  backTODir: () => {},
  upDir: () => {},
  reset: () => {},
  openNav: () => {},
});

const initalFileState = {
  path: [],
  selectedImg: '',
  showNavPannel: false,
};

const FileContextProivder = ({ children }) => {
  const [files, setFiles] = useState();
  const [modelObj, setModelObj] = useState(initalFileState);

  const handleDirectoryPick = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const entries = await getAllFiles(dirHandle);
      setFiles(entries);
      setModelObj((prv) => ({
        ...prv,
        path: [{ id: entries.id, name: entries.dir.name }],
      }));
    } catch (err) {
      alert('Please Select Directory');
      console.error(err);
    }
  };

  const handlerFolderOpen = (obj) => {
    setModelObj((prv) => {
      const _new = { ...prv };
      _new.path.push(obj);
      _new.selectedImg = '';
      return { ..._new };
    });
  };

  const backTOPrvDir = () => {
    setModelObj((prv) => {
      const _new = { ...prv };
      _new.path.pop();
      _new.selectedImg = '';
      _new.showNavPannel = false;
      return { ..._new };
    });
  };

  const handlerSelImg = (obj) => {
    setModelObj((prv) => {
      const _new = { ...prv };
      if (_new.selectedImg.name === obj.name) {
        _new.selectedImg = '';
      } else {
        _new.selectedImg = obj;
      }
      return { ..._new };
    });
  };

  const handlerResetFileSys = () => {
    setFiles(undefined);
    setModelObj(initalFileState);
  };

  const dirNavHandler = (down = false) => {
    setModelObj((prv) => {
      const _new = { ...prv };
      const _updatePath = _new.path.pop();
      let _id = Number(_updatePath.id.split('_').pop());
      _id = down ? _id + 1 : _id - 1;
      if (_id < 0) {
        _id = _updatePath.length - 1;
      }
      if (_id >= _updatePath.length) {
        _id = 0;
      }
      const _newPath = [..._new.path, { ..._updatePath, id: `dir_${_id}` }];
      const _name = getDirName(files.files, _newPath);
      _new.path = [..._new.path, { ..._updatePath, id: `dir_${_id}`, name: _name }];
      _new.selectedImg = { idx: 0, name: _name };
      return { ..._new };
    });
  };

  const openNavPannel = () => {
    setModelObj((prv) => {
      const _new = { ...prv };
      _new.showNavPannel = true;
      return { ..._new };
    });
  };

  const fileCtx = {
    rootDir: files,
    fileState: modelObj,
    dirPicker: handleDirectoryPick,
    openDir: handlerFolderOpen,
    selectImg: handlerSelImg,
    backTODir: backTOPrvDir,
    dirNav: dirNavHandler,
    reset: handlerResetFileSys,
    openNav: openNavPannel,
  };
  return <FileContext.Provider value={fileCtx}>{children}</FileContext.Provider>;
};

export default FileContextProivder;

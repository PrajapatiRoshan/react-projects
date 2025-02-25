import React, { useContext, useEffect, useState } from 'react';

import Heading from './Heading';
import FileContextProivder, { FileContext } from '../store/FileContext';

const SelecteDir = () => {
  const fileCtx = useContext(FileContext);
  return (
    <div className={`selectDirectory ${fileCtx.rootDir ? 'hide' : ''}`}>
      <Heading headingSize={2} />
      <button onClick={fileCtx.dirPicker} className={'buttonFileUpload'}>
        Open Directory
      </button>
    </div>
  );
};

export default SelecteDir;

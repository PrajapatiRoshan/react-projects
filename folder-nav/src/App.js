import React from 'react';
import './App.css';
import SelecteDir from './components/SelecteDir';
import DisplayFiles from './components/DisplayFiles';
import FileContextProivder from './store/FileContext';

const App = () => {
  return (
    <div className="App">
      <FileContextProivder>
        <SelecteDir />
        <DisplayFiles />
      </FileContextProivder>
    </div>
  );
};

export default App;


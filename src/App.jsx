import React, { useState } from 'react';
import Recorder from './components/Recorder';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="app-container">
      {!selectedLanguage ? (
        <LanguageSelector onLanguageSelect={setSelectedLanguage} />
      ) : (
        <Recorder selectedLanguage={selectedLanguage} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './languageSelector.css';

function LanguageSelector({ onLanguageSelect }) {
  const [language, setLanguage] = useState('');

  const handleSelection = () => {
    if (language) {
      onLanguageSelect(language);
    } else {
      alert('Please select a language.');
    }
  };

  return (
    <div className="language-selector">
      <h2>Welcome to Voice Recorder</h2>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">Select Language</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Telugu">Telugu</option>
        <option value="Tamil">Tamil</option>
        <option value="Kannada">Kannada</option>
        <option value="Malayalam">Malayalam</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Arabic">Arabic</option>
        <option value="Chinese">Chinese</option>
        <option value="Japanese">Japanese</option>
        <option value="Russian">Russian</option>
        <option value="Portuguese">Portuguese</option>
      </select>
      <button onClick={handleSelection} className="startreco">OK</button>
    </div>
  );
}

export default LanguageSelector;

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputColor, setInputColor] = useState('');
  const [responseColor, setResponseColor] = useState('');

  const isValidHex = (color) => /^#[0-9A-F]{6}$/i.test(color);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidHex(inputColor)) {
      setResponseColor('Invalid color code');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/convertColor', {
        color: inputColor,
      });
      setResponseColor(response.data.generatedText);
    } catch (error) {
      console.error('Error:', error);
      setResponseColor('Error converting color');
    }
  };

  function isColorLight(hexColor) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }
  
  const backgroundColor = isColorLight(inputColor) ? '#000000' : '#FFFFFF'; 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          placeholder="Enter a hex color code"
        />
        <button type="submit">Convert Color</button>
      </form>
      {responseColor && (
      <div style={{ color: inputColor, backgroundColor, fontSize: '22px', fontFamily: 'Georgia' }}>
        {responseColor}
      </div>
      )}
    </div>
);

};

export default App;
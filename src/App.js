import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    // Prepare the image to be sent
    const formData = new FormData();
    const imageInput = document.getElementById('upload-button');
    if (imageInput && imageInput.files[0]) {
      formData.append("file", imageInput.files[0]);

      try {
        const response = await fetch("https://woundapi.onrender.com/predict/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            cors: "no-cors",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPrediction(data.prediction);
        setError('');
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setPrediction('');
      }
    }
  };

  return (
    <div className="App">
      <div className="upload-section">
        {selectedImage ? (
          <img src={selectedImage} alt="Imagen seleccionada" className="preview-image" />
        ) : (
          <button onClick={() => document.getElementById('upload-button').click()} className="upload-label">
            <i className="fa fa-upload"></i> &nbsp; Subir imagen
          </button>
        )}
        <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleImageChange} accept="image/jpeg" />
        <br />
        {error && <div className="error-message">{error}</div>}
        {prediction && <div className="prediction-result">Predicción: {prediction}</div>}
        <button onClick={handleSubmit} className="submit-button">Analizar Imagen</button>
      </div>
    </div>
  );
}

export default App;

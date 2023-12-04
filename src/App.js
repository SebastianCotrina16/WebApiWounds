import React, { useState } from 'react';
import './App.css'; // Importar el archivo CSS

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    // Aquí va el código para enviar la imagen a la API
  };

  return (
    <div className="App">
      <div className="upload-section">
        {selectedImage ? (
          <img src={selectedImage} alt="Imagen seleccionada" className="preview-image" />
        ) : (
          <label htmlFor="upload-button" className="upload-label">
            <i className="fa fa-upload"></i> &nbsp; Subir imagen
          </label>
        )}
        <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleImageChange} />
        <br />
        <button onClick={handleSubmit} className="submit-button">Analizar Imagen</button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './MoanaDashboard.css'; // Asegúrate de tener este archivo con tus estilos
import { Button, CircularProgress, Alert } from '@mui/material';

function MoanaDashboard() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            setSelectedImage(imageFile);

            const previewUrl = URL.createObjectURL(imageFile);
            setImagePreviewUrl(previewUrl);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setAnalysisResult(null);
        if (!selectedImage) {
            alert('Por favor, selecciona una imagen.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedImage);


        const response = await fetch('https://woundapi.onrender.com/predict/', {
            method: 'POST',
            body: formData,
            headers: {
                //'accept': 'application/json',
                //'Content-Type': 'multipart/form-data'
            },

        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert(data);
        if (data.prediction) {
            setAnalysisResult({ message: `Predicción: ${data.prediction}` });
        } else {
            throw new Error('Respuesta de la API no contiene la predicción esperada.');
        }

    };

    return (
        <div className="moana-dashboard">
            <header className="header">
                <h1>Moana</h1>
            </header>
            <nav className="navigation">
                <a href="/">Inicio</a>
            </nav>
            <main className="main-content">
                <div className="image-upload-section">
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Seleccionar Imagen
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        component="span"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Analizar Imagen
                    </Button>
                    {isLoading && <CircularProgress />}
                    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Previsualización de la herida" />}
                </div>
                {analysisResult && (
                    <Alert severity="info">{analysisResult.message}</Alert>
                )}
            </main>
            <footer className="footer">
                <p>Derechos reservados © Moana</p>
            </footer>
        </div>
    );
}

export default MoanaDashboard;

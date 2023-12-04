const formData = new FormData();
formData.append('file', './descarga.jpg');
fetch('https://woundapi.onrender.com/predict/', {

    method: 'POST',
    body: formData,

}).then(response => response.json()).then(data => console.log(data));
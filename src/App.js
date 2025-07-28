import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
const CropAndIrrigationPrediction = () => {
  const [formData, setFormData] = useState({
    model: 'crop', // Default to 'crop'
    N:'',
    P:'',
    K:'',
    temperature: '',
    rainfall: '',
    ph: '',
    humidity: '',
    cropDays: '',
    soilMoisture: '',
    soilTemp: '',
    irrigationTemp: '',
    irrigationHumidity: '',
    language: 'en',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the required fields based on the selected model
    if (formData.model === 'crop' && (!formData.N || !formData.P || !formData.K || !formData.temperature || !formData.rainfall || !formData.ph || !formData.humidity)) {
      setError('All crop prediction fields are required.');
      return;
    }

    if (formData.model === 'irrigation' && (!formData.cropDays || !formData.soilMoisture || !formData.soilTemp || !formData.irrigationTemp || !formData.irrigationHumidity)) {
      setError('All irrigation prediction fields are required.');
      return;
    }

    try {
      setError('');
      let response;

      if (formData.model === 'crop') {
        // Send crop prediction request
        response = await axios.post('http://127.0.0.1:5000/predict_crop', formData);
      } else {
        // Send irrigation prediction request
        response = await axios.post('http://127.0.0.1:5000/predict_irrigation', formData);
      }

      setPrediction(response.data); // Set the prediction data based on the selected model

    } catch (err) {
      setError('An error occurred while making the prediction.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Crop and Irrigation Prediction</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <h3>Select Model</h3>
          <select name="model" value={formData.model} onChange={handleChange}>
            <option value="crop">Crop Prediction</option>
            <option value="irrigation">Irrigation Prediction</option>
          </select>
        </div>

        {/* Conditional rendering of fields based on selected model */}
        {formData.model === 'crop' && (
          <div>
            <h3>Crop Prediction</h3>
            <input
              type="number"
              name="N"
              value={formData.N}
              onChange={handleChange}
              placeholder="Nitrogen"
              required
            />
            <input
              type="number"
              name="P"
              value={formData.P}
              onChange={handleChange}
              placeholder="phosporous"
              required
            />
            <input
              type="number"
              name="K"
              value={formData.K}
              onChange={handleChange}
              placeholder="potassium"
              required
            />
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="Temperature"
              required
            />
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              placeholder="Rainfall"
              required
            />
            <input
              type="number"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              placeholder="pH Level"
              required
            />
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder="Humidity"
              required
            />
          </div>
        )}

        {formData.model === 'irrigation' && (
          <div>
            <h3>Irrigation Prediction</h3>
            <input
              type="number"
              name="cropDays"
              value={formData.cropDays}
              onChange={handleChange}
              placeholder="Crop Days"
              required
            />
            <input
              type="number"
              name="soilMoisture"
              value={formData.soilMoisture}
              onChange={handleChange}
              placeholder="Soil Moisture"
              required
            />
            <input
              type="number"
              name="soilTemp"
              value={formData.soilTemp}
              onChange={handleChange}
              placeholder="Soil Temperature"
              required
            />
            <input
              type="number"
              name="irrigationTemp"
              value={formData.irrigationTemp}
              onChange={handleChange}
              placeholder="Irrigation Temperature"
              required
            />
            <input
              type="number"
              name="irrigationHumidity"
              value={formData.irrigationHumidity}
              onChange={handleChange}
              placeholder="Irrigation Humidity"
              required
            />
          </div>
        )}

        <div>
          <h3>Language</h3>
          <select name="language" value={formData.language} onChange={handleChange}>
          <option value="en">English</option>
  <option value="te">Telugu</option>
  <option value="ta">Tamil</option>
  <option value="hi">Hindi</option>
  <option value="kn">Kannada</option>
  <option value="ml">Malayalam</option>
            {/* Add more language options as needed */}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction && formData.model === 'crop' && (
        <div>
          <h3>Crop Prediction</h3>
          <p>Predicted Crop: {prediction.predicted_crop}</p>
          <p>Explanation: {prediction.explanation}</p>
        </div>
      )}

      {prediction && formData.model === 'irrigation' && (
        <div>
          <h3>Irrigation Prediction</h3>
          <p>Predicted Irrigation: {prediction.predicted_irrigation}</p>
          <p>Explanation: {prediction.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CropAndIrrigationPrediction;

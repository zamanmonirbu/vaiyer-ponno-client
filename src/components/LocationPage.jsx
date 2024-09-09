import { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for making API requests

const LocationPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [roadName, setRoadName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY = '3232c1153ab849e5ab17fce13ce22a94'; 

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          
          setUserLocation(location);
          localStorage.setItem('userLocation', JSON.stringify(location));

          getLocationDetails(latitude, longitude);
        },
        (error) => {
          // Handle error if permission is denied or location is unavailable
          setErrorMessage('Location access denied. Please enable location services.',error);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  }, []);

  const getLocationDetails = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
      );
      if (response.data.results.length > 0) {
        const components = response.data.results[0].components;
        const city = components.city || components.town || components.village;
        const postcode = components.postcode || 'N/A';
        const road = components.road || components.street || 'N/A';

        setCityName(city);
        setPostalCode(postcode);
        setRoadName(road);
      } else {
        setErrorMessage('Unable to fetch location details');
      }
    } catch (error) {
      setErrorMessage('Error fetching location details',error);
    }
  };

  return (
    <div className="index-page">
      {errorMessage && <p className="error">{errorMessage}</p>}
      
      {userLocation ? (
        <div>
          {cityName ? (
            <>
              <p>Your city is: {cityName}</p>
              <p>Postal Code: {postalCode}</p>
              <p>Road/Street: {roadName}</p>
            </>
          ) : (
            <p>Fetching location details...</p>
          )}
        </div>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default LocationPage;

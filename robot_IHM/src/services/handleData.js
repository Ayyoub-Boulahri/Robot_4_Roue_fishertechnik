import axios from "axios";

const API_URL = "http://localhost:5000/data";

export const converJsonForDB = (data) => {
  let convertedData = convertData(data)
  return {
    "ultraSonor": [
      { "distance_cm": convertedData?.ultraSon?.[0], "sensor_position": "front_right" },
      { "distance_cm": convertedData?.ultraSon?.[1], "sensor_position": "front_left" },
      { "distance_cm": convertedData?.ultraSon?.[2], "sensor_position": "center_right" },
      { "distance_cm": convertedData?.ultraSon?.[3], "sensor_position": "center_left" }
    ],
    "line_follow": [
      { "sensor_pos": "front_right", "state": convertedData?.line_sensor?.[0] == 0 ? true : false },
      { "sensor_pos": "front_left", "state": convertedData?.line_sensor?.[1] == 0 ? true : false },
      { "sensor_pos": "center_right", "state": convertedData?.line_sensor?.[2] == 0 ? true : false },
      { "sensor_pos": "center_left", "state": convertedData?.line_sensor?.[3] == 0 ? true : false }
    ]
  }
}
// Fonction pour récupérer des données (GET)
export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error("Erreur lors du GET:", error);
    throw error;
  }
};

export const sendData = async (data) => {
  try {
    const response = await axios.post(API_URL,converJsonForDB(data));
    return response.data; 
  } catch (error) {
    console.error("Erreur lors du POST:", error);
    throw error;
  }
};

export const convertData = (data) => {
  if (!data) return null;
  try {
      const jsonReady = data.replace(/'/g, '"');
      const convertedData = JSON.parse(jsonReady);
      return convertedData;
  } catch (err) {
      console.error("Invalid JSON string:", data);
      return null;
  }
};

import axios from 'axios';

const BASE_URL = "http://localhost:8000";

// const headers = {
//   "Content-Type": "application/json",
// };

export const fetchFromServer = async (url, values) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, values);

    return response;
  } catch (error) {
    console.log("Erreur survenue lors de l'opération", error);
  }
};
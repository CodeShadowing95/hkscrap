import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

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

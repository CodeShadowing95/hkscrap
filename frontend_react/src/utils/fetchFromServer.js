import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const fetchFromServer = async (url, values) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, values, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log("Erreur survenue lors de l'opération", error);
  }
};

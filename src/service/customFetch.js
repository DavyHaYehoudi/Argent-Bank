import {handleFetchError} from "./errors/handleFecthError.js"
export const customFetch = async (
  endpoint,
  options = {},
  unauthorizedCallback = () => {}
) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        unauthorizedCallback();
      }
      const responseData = await response.json();
      const errorDetails = {
        status: response.status,
        message: responseData.message || "An error has occurred",
        route: response.url,
      };
      throw new Error(JSON.stringify(errorDetails));
    }
    return await response.json();
  } catch (error) {
    handleFetchError(error);
    throw error;
  }
};

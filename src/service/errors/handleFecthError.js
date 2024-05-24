import { toast } from "react-toastify";

export const handleFetchError = (error) => {
  const errorDetails = JSON.parse(error.message);
  console.log("errorDetails:", errorDetails);
  const { status, message, route } = errorDetails;

  if (route.includes("auth/")) {
    return toast.error(message);
  }
  if (status === 400) {
    toast.error("Invalid information provided 🚫 ");
  }
  if (status === 404) {
    toast.error("Resource not found 🧐 ");
  }
  if (status === 409) {
    toast.error("Already registered, please edit 🔀 ");
  }
  if (status === 500) {
    toast.error("Network error  🌐  or from the server 🛠️ ");
  }
};

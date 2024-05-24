import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useUnauthorizedRedirect = () => {
  const navigate = useNavigate();

  const handleUnauthorized = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;

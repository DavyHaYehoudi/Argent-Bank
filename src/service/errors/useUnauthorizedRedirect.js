import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetStore } from "../../features/userSlice";

const useUnauthorizedRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUnauthorized = useCallback(() => {
    navigate("/login");
    dispatch(resetStore());
  }, [navigate, dispatch]);

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;

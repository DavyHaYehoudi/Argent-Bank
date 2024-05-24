import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../../features/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const userInfo = useSelector((state) => state?.user?.data);
  const { firstName } = userInfo || {};

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetStore());
  };

  return {
    token,
    firstName,
    handleLogout,
  };
};

export default useAuth;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../service/errors/useUnauthorizedRedirect";
import {
  fetchUserData,
  setToken,
  updateUserProfile,
} from "../../features/userSlice";

const useUserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [userInfoEditing, setUserInfoEditing] = useState({
    firstName: "",
    lastName: "",
  });

  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchUserData({ handleUnauthorized }));
    //Si rafraîchissement => persiste
    dispatch(setToken(token));
  }, [dispatch, handleUnauthorized, token]);

  const userInfo = useSelector((state) => state?.user?.data);
  const { firstName, lastName } = userInfo || {};

  const handleEdit = () => {
    setIsEditing(true);
    setUserInfoEditing({ firstName, lastName });
  };

  const handleSave = () => {
    if (!userInfoEditing.firstName || !userInfoEditing.lastName) {
      setError(true);
      return;
    }
    setIsEditing(false);
    dispatch(
      updateUserProfile({ formData: userInfoEditing, handleUnauthorized })
    );
    setError(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserInfoEditing({ firstName: "", lastName: "" });
    setError(false);
  };

  const handleChangeEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfoEditing((prev) => ({ ...prev, [name]: value }));
    setError(false);
  };

  return {
    isEditing,
    error,
    userInfoEditing,
    firstName,
    lastName,
    handleEdit,
    handleSave,
    handleCancel,
    handleChangeEdit,
  };
};

export default useUserProfile;

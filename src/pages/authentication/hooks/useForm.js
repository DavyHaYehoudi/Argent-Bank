import { useState } from "react";
import { toast } from "react-toastify";
import { Post } from "../../../service/httpMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../features/userSlice";

const useForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const data = await Post("user/login", formData);
      const token = data?.body?.token || "";
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
export default useForm;

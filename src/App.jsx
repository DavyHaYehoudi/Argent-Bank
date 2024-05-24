import PropTypes from "prop-types";
import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./pages/authentication/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navigation from "./layout/Navigation";
import Home from "./pages/Home";
import Footer from "./layout/Footer";

// Wrapper pour protéger la route
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

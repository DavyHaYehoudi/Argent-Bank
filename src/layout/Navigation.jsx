import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const Navigation = () => {
    const { token, firstName, handleLogout } = useAuth();

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          src="/images/argentBankLogo.png"
          alt="Argent Bank Logo"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!token ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> {firstName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

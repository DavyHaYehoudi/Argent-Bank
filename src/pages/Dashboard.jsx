import { useEffect, useState } from "react";
import AccountSection from "../components/AccountSection";
import { useDispatch, useSelector } from "react-redux";
import { editInfo, fetchUserData } from "../features/userSlice";
import useUnauthorizedRedirect from "../service/errors/useUnauthorizedRedirect";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [userInfoEditing, setUserInfoEditing] = useState({
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect;
  useEffect(() => {
    dispatch(fetchUserData({ handleUnauthorized }));
  }, [dispatch, handleUnauthorized]);
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
    dispatch(editInfo(userInfoEditing));
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
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!isEditing &&
          <>
          {firstName} {lastName} !
          </>
          }
        </h1>
        {isEditing ? (
          <div className="user-editing">
            <div className="user-editing-fields">
              <input
                type="text"
                value={userInfoEditing.firstName}
                name="firstName"
                className="input-edit-user"
                onChange={handleChangeEdit}
              />
              <input
                type="text"
                value={userInfoEditing.lastName}
                name="lastName"
                className="input-edit-user"
                onChange={handleChangeEdit}
              />
            </div>
            <div className="user-editing-confirm">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
            {error && (
              <p style={{ color: "red" }}>
                The firstname and lastName fields are required
              </p>
            )}
          </div>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountSection
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <AccountSection
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <AccountSection
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default Dashboard;

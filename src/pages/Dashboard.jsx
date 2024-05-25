import useUserProfile from "./hooks/useUserProfile";
import AccountSection from "../components/AccountSection";

const Dashboard = () => {
  const {
    isEditing,
    error,
    userInfoEditing,
    firstName,
    lastName,
    handleEdit,
    handleSave,
    handleCancel,
    handleChangeEdit,
  } = useUserProfile();

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!isEditing && (
            <>
              {firstName} {lastName} !
            </>
          )}
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

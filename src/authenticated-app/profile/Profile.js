import React from "react";
import AddressBook from "./AddressBook";

const Profile = ({ user, setError }) => {
  const renderOrderHistory = () => {
    return <> </>;
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <AddressBook user={user} setError={setError} />
      <h1>Order History</h1>
      {renderOrderHistory()}
    </div>
  );
};

export default Profile;

import React from "react";
import AddressBook from "./AddressBook";

const Profile = ({ user, setError }) => {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <AddressBook user={user} setError={setError} />
    </div>
  );
};

export default Profile;

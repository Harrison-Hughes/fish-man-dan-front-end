import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const UnauthenticatedApp = ({ setUser, setError, user }) => {
  const [loginOrSignup, setLoginOrSignup] = [true];

  return (
    <div className="unauthenticated-app">
      {loginOrSignup ? (
        <LoginForm
          setError={setError}
          setUser={setUser}
          changeToSignup={setLoginOrSignup(false)}
        />
      ) : (
        <SignupForm changeToLogin={setLoginOrSignup(false)} />
      )}
    </div>
  );
};

export default UnauthenticatedApp;

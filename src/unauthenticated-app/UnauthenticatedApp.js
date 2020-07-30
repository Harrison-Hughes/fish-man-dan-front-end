import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const UnauthenticatedApp = ({ setUser, setError, user }) => {
  const [loginOrSignup, setLoginOrSignup] = useState(true);

  return (
    <div className="unauthenticated-app">
      {loginOrSignup ? (
        <LoginForm
          setError={setError}
          setUser={setUser}
          changeToSignup={() => setLoginOrSignup(false)}
        />
      ) : (
        <SignupForm
          setError={setError}
          setUser={setUser}
          changeToLogin={() => setLoginOrSignup(true)}
        />
      )}
    </div>
  );
};

export default UnauthenticatedApp;

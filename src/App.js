import React, { useState, useEffect } from "react";
import API from "./adapters/API";

const App = () => {
  const [user, setUser] = useState(false);
  const [validatedUser, setValidatedUser] = useState(false);
  const [error, setError] = useState(false);

  const logOut = () => {
    setUser(null);
    API.clearToken();
  };

  useEffect(() => {
    if (API.hasToken) {
      API.validate()
        .then(setUser)
        .then(() => setValidatedUser(true))
        .catch((errorPromise) => {
          if (!errorPromise) errorPromise.then(setError);
          else
            setError({
              message: "Server is currently offline. Please try later",
            });
        });
    } else {
      setValidatedUser(true);
    }
  }, []);

  if (!validatedUser) return <LoadingScreen />;
  else return <div className="App"></div>;
};

export default App;

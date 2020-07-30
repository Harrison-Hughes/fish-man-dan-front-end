import React, { useState, useEffect } from "react";
import API from "./adapters/API";
import { Container, Segment } from "semantic-ui-react";
import LoadingScreen from "./LoadingScreen";
import AuthenticatedApp from "./authenticated-app/AuthenticatedApp";
import UnauthenticatedApp from "./unauthenticated-app/UnauthenticatedApp";

const App = () => {
  const [user, setUser] = useState(false);
  const [validatedUser, setValidatedUser] = useState(false);
  const [error, setError] = useState(false);

  const logOut = () => {
    setUser(false);
    API.clearToken();
    localStorage.removeItem("fishManDanToken");
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
  else
    return (
      <div className="app">
        <Container id="main-content">
          {error && (
            <Segment textAlign="center" color="red" inverted>
              {" "}
              <h2>{error.message}</h2>
            </Segment>
          )}
          {user ? (
            <AuthenticatedApp
              user={user}
              setError={setError}
              setUser={setUser}
              logOut={() => logOut()}
            />
          ) : (
            <UnauthenticatedApp
              setUser={setUser}
              setError={setError}
              user={user}
            />
          )}
        </Container>
      </div>
    );
};

export default App;

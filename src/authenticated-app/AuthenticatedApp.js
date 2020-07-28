import React, { useState } from "react";
import Items from "./Items";
import Navbar from "../Navbar";

const AuthenticatedApp = ({ user, setUser, setError, logOut }) => {
  const [basket, setBasket] = useState([]);
  const [bodyType, setBodyType] = useState("view");

  const body = () => {
    if (bodyType === "view")
      return (
        <Items
          mode={"view"}
          setUser={setUser}
          setError={setError}
          basket={basket}
          setBasket={setBasket}
          setBodyType={setBodyType}
        />
      );
    else if (bodyType === "interact")
      return (
        <Items
          mode={"interact"}
          setUser={setUser}
          setError={setError}
          basket={basket}
          setBasket={setBasket}
          setBodyType={setBodyType}
        />
      );
  };

  return (
    <div className="authenticated-app">
      <Navbar
        user={user}
        logOut={() => logOut()}
        setUser={setUser}
        bodyType={bodyType}
        setBodyType={setBodyType}
      />
      {body()}
    </div>
  );
};

export default AuthenticatedApp;

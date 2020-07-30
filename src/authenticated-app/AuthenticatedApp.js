import React, { useState, useEffect } from "react";
import Items from "./Items";
import Navbar from "../Navbar";

const AuthenticatedApp = ({ user, setUser, setError, logOut }) => {
  const [basket, setBasket] = useState([]);
  const [bodyType, setBodyType] = useState("browse");

  useEffect(() => {
    if (!!localStorage.fishManDanLocalBasket) {
      setBasket(JSON.parse(localStorage.fishManDanLocalBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.fishManDanLocalBasket = JSON.stringify(basket);
  }, [basket]);

  const body = () => {
    if (bodyType === "browse")
      return (
        <Items
          interactive={true}
          setUser={setUser}
          setError={setError}
          basket={basket}
          setBasket={setBasket}
          setBodyType={setBodyType}
        />
      );
    else if (bodyType === "basket") return <div></div>;
    else if (bodyType === "profile") return <div></div>;
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

import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import Items from "./Items";
import Navbar from "../Navbar";
import Basket from "./basket/Basket";

const AuthenticatedApp = ({ user, setUser, setError, logOut }) => {
  const [items, setItems] = useState([]);
  const [basket, setBasket] = useState([]);
  const [bodyType, setBodyType] = useState("browse");

  useEffect(() => {
    API.getItems()
      .then(setItems)
      .catch((errorPromise) => {
        console.log("ERROR");
        setUser(false);
        if (!errorPromise) errorPromise.then(setError);
        else
          setError({
            message: "Server is currently offline. Please try later",
          });
      });
  }, [user, setUser, setError]);

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
          items={items}
          interactive={true}
          basket={basket}
          setBasket={setBasket}
        />
      );
    else if (bodyType === "basket")
      return <Basket user={user} basket={basket} setBasket={setBasket} />;
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

import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import Items from "./Items";
import Navbar from "../Navbar";
import Basket from "./basket/Basket";
import Profile from "./profile/Profile";
import { Switch, Route, Redirect } from "react-router-dom";

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

  return (
    <div className="authenticated-app">
      <Navbar
        user={user}
        logOut={() => logOut()}
        setUser={setUser}
        bodyType={bodyType}
        setBodyType={setBodyType}
      />
      <Redirect to={`/user/${bodyType}`} />
      <Switch>
        <Route exact path={`/user/browse`}>
          <Items
            items={items}
            interactive={true}
            basket={basket}
            setBasket={setBasket}
          />
        </Route>
        <Route exact path="/user/basket">
          <Basket
            user={user}
            items={items}
            basket={basket}
            setBasket={setBasket}
            setBodyType={setBodyType}
          />
        </Route>
        <Route exact path="/user/profile">
          <Profile setError={setError} user={user} />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;

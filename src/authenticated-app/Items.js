import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import ItemCard from "./ItemCard";
import ItemCard2 from "./ItemCard2";
import { Button, Icon, Image, Item, Label, Card } from "semantic-ui-react";

const Items = ({
  user,
  setUser,
  setError,
  logOut,
  basket,
  setBasket,
  mode,
}) => {
  const [items, setItems] = useState([]);

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
  }, [setUser, setError]);

  const itemsType = () => {
    if (mode == "view")
      return (
        <Card.Group>
          {items.map((i) => (
            <ItemCard2
              item={i}
              key={i.id}
              basket={basket}
              setBasket={setBasket}
            />
          ))}
        </Card.Group>
      );
    else if (mode == "interact")
      return (
        <Item.Group divided>
          {items.map((i) => (
            <ItemCard
              item={i}
              key={i.id}
              basket={basket}
              setBasket={setBasket}
            />
          ))}
        </Item.Group>
      );
  };

  return (
    <div className="items">
      {itemsType()}
      {/* <Item.Group divided>
        {items.map((i) => (
          <ItemCard item={i} key={i.id} basket={basket} setBasket={setBasket} />
        ))}
      </Item.Group>
      <Card.Group>
        {items.map((i) => (
          <ItemCard2
            item={i}
            key={i.id}
            basket={basket}
            setBasket={setBasket}
          />
        ))}
      </Card.Group> */}
    </div>
  );
};

export default Items;

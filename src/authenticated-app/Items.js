import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import ItemCardInteractive from "./ItemCardInteractive";
import ItemCardView from "./ItemCardView";
import { Button, Icon, Image, Item, Label, Card } from "semantic-ui-react";

const Items = ({ setUser, setError, basket, setBasket, mode }) => {
  const [items, setItems] = useState([]);
  const [selectedItemID, setSelectedItemID] = useState(null);

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
            <ItemCardView
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
        <Card.Group>
          {items.map((i) => (
            <ItemCardInteractive
              item={i}
              key={i.id}
              basket={basket}
              setBasket={setBasket}
              selectedItemID={selectedItemID}
              setSelectedItemID={setSelectedItemID}
            />
          ))}
        </Card.Group>
      );
  };

  return <div className="items">{itemsType()}</div>;
};

export default Items;

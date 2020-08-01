import React, { useState } from "react";
import ItemCardInteractive from "./ItemCardInteractive";
import ItemCardView from "./ItemCardView";
import { Card } from "semantic-ui-react";

const Items = ({ items, basket, setBasket, interactive }) => {
  const [selectedItemID, setSelectedItemID] = useState(null);

  const itemsType = () => {
    if (!interactive)
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
    else if (interactive)
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

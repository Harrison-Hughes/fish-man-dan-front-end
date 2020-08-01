import React from "react";
import { Item } from "semantic-ui-react";

const BasketItem = ({ basket, setBasket, item }) => {
  const itemInBasket = () => {
    return basket.find((bi) => item.id === bi.item_id);
  };

  return (
    <Item>
      <Item.Content>
        <Item.Header>
          {item.name} x{itemInBasket().amount}g
        </Item.Header>
        <Item.Meta>price of item</Item.Meta>
      </Item.Content>
    </Item>
  );
};

export default BasketItem;

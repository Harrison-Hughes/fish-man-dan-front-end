import React from "react";
import { Item } from "semantic-ui-react";

const BasketItem = ({ basket, item }) => {
  const itemInBasket = () => {
    return basket.find((bi) => item.id === bi.item_id);
  };

  const priceContent = () => {
    if (item.price_by_each) {
      return `£${parseFloat(item.price_per).toFixed(2)} each`;
    } else return `£${parseFloat(item.price_per).toFixed(2)} per. kg`;
  };

  const quantityContent = () => {
    if (item.custom_amount) {
      return `Request: ${itemInBasket().amount}`;
    } else return `Quantity: ${itemInBasket().amount}`;
  };

  return (
    <Item>
      <Item.Content>
        <Item.Header>{item.name}</Item.Header>
        <Item.Meta>Price: {priceContent()}</Item.Meta>
        <Item.Meta>Size: {item.size}</Item.Meta>
        <Item.Meta>{quantityContent()}</Item.Meta>
      </Item.Content>
    </Item>
  );
};

export default BasketItem;

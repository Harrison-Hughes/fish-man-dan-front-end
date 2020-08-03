import React from "react";
import { Item, Button } from "semantic-ui-react";
import BasketItem from "./BasketItem";

const Basket = ({ basket, setBasket, items }) => {
  const basketItems = () => {
    let basketItems = items.filter(
      (i) => !!basket.find((bi) => bi.item_id === i.id)
    );
    return basketItems.map((i) => (
      <BasketItem key={i.id} item={i} basket={basket} setBasket={setBasket} />
    ));
  };

  return (
    <div>
      <Item.Group divided>
        {basketItems()}
        <Item>
          <Item.Content floated="right">
            <Item.Header>TOTAL: total price of items</Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>

      <Button content="proceed to checkout" positive />
    </div>
  );
};

export default Basket;

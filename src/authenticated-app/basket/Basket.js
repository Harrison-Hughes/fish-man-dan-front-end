import React, { useState, useEffect } from "react";
import { Item, Button } from "semantic-ui-react";
import BasketItem from "./BasketItem";

const Basket = ({ basket, setBasket, items, setBodyType }) => {
  const [editBasketEnabled, setEditBasketEnabled] = useState(true);
  const [placeOrderEnabled, setPlaceOrderEnabled] = useState(true);

  useEffect(() => {
    if (basket.length === 0) {
      setEditBasketEnabled(false);
      setPlaceOrderEnabled(false);
    }
  }, [basket.length]);

  const basketItems = () => {
    let basketItems = items.filter(
      (i) => !!basket.find((bi) => bi.item_id === i.id)
    );
    if (basket.length === 0) {
      return (
        <Item>
          <Item.Content>
            <Item.Header>
              You currently have no items in your basket
            </Item.Header>
          </Item.Content>
        </Item>
      );
    } else
      return basketItems.map((i) => (
        <BasketItem key={i.id} item={i} basket={basket} setBasket={setBasket} />
      ));
  };

  const renderBasket = () => {
    return (
      <>
        <Item.Group divided>{basketItems()}</Item.Group>
        <Button
          content="continue browsing"
          onClick={() => setBodyType("browse")}
        />
        <Button content="edit basket" primary disabled={!editBasketEnabled} />
        <Button
          content="proceed to place order"
          positive
          disabled={!placeOrderEnabled}
        />
      </>
    );
  };

  const renderOrder = () => {
    return <> </>;
  };

  return (
    <div>
      <h1>Basket</h1>
      {renderBasket()}
      <h1>Pending Order</h1>
      {renderOrder()}
    </div>
  );
};

export default Basket;

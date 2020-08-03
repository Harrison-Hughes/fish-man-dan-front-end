import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Popup } from "semantic-ui-react";
// import NumericInput from "react-numeric-input";

const ItemInBasketForm = ({ basket, setBasket, item }) => {
  const [min, max] = [parseFloat(item.min), parseFloat(item.max)];
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: basket.find((i) => i.item_id === item.id).amount,
  });
  const [editBasketEnabled, setEditBasketEnabled] = useState(false);

  useEffect(() => {
    if (
      formData["amount"] >= min &&
      formData["amount"] <= max &&
      formData["amount"] !== basket.find((i) => i.item_id === item.id).amount
    ) {
      setEditBasketEnabled(true);
    } else setEditBasketEnabled(false);
  }, [formData, basket, item, min, max]);

  const handleEditBasket = (e) => {
    e.preventDefault();
    let basketIndexOfItem = basket.findIndex((i) => i.item_id === item.id);
    setBasket(
      Object.assign([], basket, {
        [basketIndexOfItem]: {
          item_id: formData["item_id"],
          amount: formData["amount"],
        },
      })
    );
  };

  const handleRemoveFromBasket = (e) => {
    e.preventDefault();
    setBasket(basket.filter((i) => i.item_id !== item.id));
  };

  const handleIntAmountDecrement = () => {
    let currAmount = formData["amount"];
    setFormData({ ...formData, amount: currAmount - 1 });
  };

  const handleIntAmountIncrement = () => {
    let currAmount = formData["amount"];
    setFormData({ ...formData, amount: currAmount + 1 });
  };

  const amountField = () => {
    return (
      <Button.Group>
        <Button
          type="button"
          icon
          onClick={handleIntAmountDecrement}
          disabled={formData["amount"] === min}
        >
          <Icon name="minus" />
        </Button>
        <Button type="button" basic color="black">
          {formData["amount"]}
        </Button>
        <Button
          type="button"
          icon
          disabled={formData["amount"] === max}
          onClick={handleIntAmountIncrement}
        >
          <Icon name="plus" />
        </Button>
      </Button.Group>
    );
  };

  return (
    <Form size="small" onSubmit={handleEditBasket}>
      <Form.Group>
        {amountField()}

        <Button
          positive
          disabled={!editBasketEnabled}
          content="update"
          type="submit"
        />
        <Popup
          trigger={
            <Button color="red" icon onClick={handleRemoveFromBasket}>
              <Icon name="trash alternate" />
            </Button>
          }
          content="remove from basket"
          basic
        />
      </Form.Group>
    </Form>
  );
};

export default ItemInBasketForm;

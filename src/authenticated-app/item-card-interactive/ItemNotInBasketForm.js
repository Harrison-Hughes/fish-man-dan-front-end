import React, { useState, useEffect } from "react";
import { Button, Form, Icon } from "semantic-ui-react";

const ItemNotInBasketForm = ({ basket, setBasket, item }) => {
  const [min, max] = [parseFloat(item.min), parseFloat(item.max)];
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: 1,
  });
  const [addToBasketEnabled, setAddToBasketEnabled] = useState(false);

  useEffect(() => {
    if (formData["amount"] >= min && formData["amount"] <= max) {
      setAddToBasketEnabled(true);
    } else setAddToBasketEnabled(false);
  }, [formData, min, max]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleAddToBasket = (event) => {
    event.preventDefault();
    setBasket([
      ...basket,
      {
        item_id: formData["item_id"],
        amount: formData["amount"],
      },
    ]);
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
    <Form size="small" onSubmit={handleAddToBasket}>
      <Form.Group>
        {amountField()}
        <Button
          disabled={!addToBasketEnabled}
          content="add to basket"
          primary
          type="submit"
        />
      </Form.Group>
    </Form>
  );
};

export default ItemNotInBasketForm;

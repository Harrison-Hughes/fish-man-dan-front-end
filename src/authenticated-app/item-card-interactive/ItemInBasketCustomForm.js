import React, { useState, useEffect } from "react";
import { Button, Form, Icon, Input, Popup } from "semantic-ui-react";

const ItemInBasketCustomForm = ({ basket, setBasket, item }) => {
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: basket.find((i) => i.item_id === item.id).amount,
  });
  const [editBasketEnabled, setEditBasketEnabled] = useState(false);

  useEffect(() => {
    if (
      formData["amount"] !== "" &&
      formData["amount"] !== basket.find((i) => i.item_id === item.id).amount
    ) {
      setEditBasketEnabled(true);
    } else setEditBasketEnabled(false);
  }, [formData, basket, item]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form size="small" onSubmit={handleEditBasket}>
      <Form.Group>
        <Form.Field
          size="large"
          control={Input}
          name="amount"
          onChange={handleChange}
          value={formData["amount"]}
          placeholder="Edit your request..."
        />
        <Popup
          trigger={
            <Button icon disabled={!editBasketEnabled} positive type="submit">
              <Icon name="write" />
            </Button>
          }
          content="update request"
          basic
        />
        <Popup
          trigger={
            <Button color="red" icon onClick={handleRemoveFromBasket}>
              <Icon name="trash alternate" />
            </Button>
          }
          content="delete request"
          basic
        />
      </Form.Group>
    </Form>
  );
};

export default ItemInBasketCustomForm;

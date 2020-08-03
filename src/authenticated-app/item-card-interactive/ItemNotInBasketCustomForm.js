import React, { useState, useEffect } from "react";
import { Button, Form, Icon, Input, Popup } from "semantic-ui-react";

const ItemNotInBasketCustomForm = ({ basket, setBasket, item }) => {
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: "",
  });
  const [addToBasketEnabled, setAddToBasketEnabled] = useState(false);

  useEffect(() => {
    if (formData["amount"] !== "") {
      setAddToBasketEnabled(true);
    } else setAddToBasketEnabled(false);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  return (
    <Form size="small" onSubmit={handleAddToBasket}>
      <Form.Group>
        <Form.Field
          size="large"
          control={Input}
          name="amount"
          onChange={handleChange}
          placeholder="Make a request..."
        />
        <Popup
          trigger={
            <Button icon disabled={!addToBasketEnabled} primary type="submit">
              <Icon name="write" />
            </Button>
          }
          content="add request"
          basic
        />
      </Form.Group>
    </Form>
  );
};

export default ItemNotInBasketCustomForm;

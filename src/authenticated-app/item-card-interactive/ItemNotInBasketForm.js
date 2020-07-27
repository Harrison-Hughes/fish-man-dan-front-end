import React, { useState, useEffect } from "react";
import { Button, Icon, Item, Form } from "semantic-ui-react";
import NumericInput from "react-numeric-input";

const ItemNotInBasketForm = ({
  min,
  max,
  stepSize,
  units,
  basket,
  setBasket,
  item,
}) => {
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: 0,
    note: "",
  });
  const [addToBasketEnabled, setAddToBasketEnabled] = useState(false);

  useEffect(() => {
    if (formData["amount"] > min && formData["amount"] % stepSize === 0) {
      setAddToBasketEnabled(true);
    } else setAddToBasketEnabled(false);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddToBasket = (event) => {
    event.preventDefault();
    let basketIndexOfItem = basket.findIndex((i) => i.item_id == item.id);
    if (basketIndexOfItem >= 0) {
      setBasket(
        Object.assign([], basket, {
          [basketIndexOfItem]: {
            item_id: formData["item_id"],
            amount: formData["amount"],
            note: formData["note"],
          },
        })
      );
    } else {
      setBasket([
        ...basket,
        {
          item_id: formData["item_id"],
          amount: formData["amount"],
          note: formData["note"],
        },
      ]);
    }
  };

  const myFormat = (num) => {
    return num + units;
  };

  const handleAmountChange = (amount) => {
    setFormData({ ...formData, amount: amount });
  };

  return (
    <Form size="small" onSubmit={handleAddToBasket}>
      <Form.Group>
        {/* <Form.Input name="amount" onChange={handleChange} /> */}
        <NumericInput
          name="amount"
          onChange={handleAmountChange}
          min={min}
          max={max}
          value={formData["amount"]}
          step={stepSize}
          format={myFormat}
          snap
        />
        <Form.Input
          placeholder="note (optional)"
          name="note"
          onChange={handleChange}
        />
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

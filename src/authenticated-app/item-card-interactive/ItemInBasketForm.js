import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Popup } from "semantic-ui-react";
import NumericInput from "react-numeric-input";

const ItemInBasketForm = ({
  min,
  max,
  stepSize,
  units,
  basket,
  setBasket,
  item,
  pricePerStepSize,
}) => {
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: basket.find((i) => i.item_id === item.id).amount,
    note: "",
  });
  const [editBasketEnabled, setEditBasketEnabled] = useState(false);

  useEffect(() => {
    if (
      formData["amount"] > min &&
      formData["amount"] % stepSize === 0 &&
      (formData["amount"] !==
        basket.find((i) => i.item_id === item.id).amount ||
        formData["note"] !== basket.find((i) => i.item_id === item.id).note)
    ) {
      setEditBasketEnabled(true);
    } else setEditBasketEnabled(false);
  }, [formData, basket, item.id, min, stepSize]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditBasket = (e) => {
    e.preventDefault();
    let basketIndexOfItem = basket.findIndex((i) => i.item_id === item.id);
    setBasket(
      Object.assign([], basket, {
        [basketIndexOfItem]: {
          item_id: formData["item_id"],
          amount: formData["amount"],
          note: formData["note"],
        },
      })
    );
  };

  const currentPriceOfItem = () => {
    let price = (formData["amount"] / stepSize) * pricePerStepSize;
    return (Math.round(price * 100) / 100).toFixed(2);
  };

  const handleRemoveFromBasket = (e) => {
    e.preventDefault();
    setBasket(basket.filter((i) => i.item_id !== item.id));
  };

  const myFormat = (num) => {
    return num + units + "  ~  £" + currentPriceOfItem();
  };

  const handleAmountChange = (amount) => {
    setFormData({ ...formData, amount: amount });
  };

  return (
    <Form size="small" onSubmit={handleEditBasket}>
      <Form.Group>
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

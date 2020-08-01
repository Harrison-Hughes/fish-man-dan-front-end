import React, { useState, useEffect, useRef } from "react";
import { Button, Icon, Form, Popup } from "semantic-ui-react";
// import NumericInput from "react-numeric-input";

const ItemInBasketForm = ({ basket, setBasket, item }) => {
  const [min, max, price_per] = [
    parseFloat(item.min),
    parseFloat(item.max),
    parseFloat(item.price_per),
  ];
  const [formData, setFormData] = useState({
    item_id: item.id,
    amount: basket.find((i) => i.item_id === item.id).amount,
  });
  const [editBasketEnabled, setEditBasketEnabled] = useState(false);

  useEffect(() => {
    if (
      formData["amount"] > min &&
      formData["amount"] !== basket.find((i) => i.item_id === item.id).amount
    ) {
      setEditBasketEnabled(true);
    } else setEditBasketEnabled(false);
  }, [formData, basket, item]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

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

  // const currentPriceOfItem = () => {
  //   let price = (formData["amount"] / stepSize) * pricePerStepSize;
  //   return (Math.round(price * 100) / 100).toFixed(2);
  // };

  const handleRemoveFromBasket = (e) => {
    e.preventDefault();
    setBasket(basket.filter((i) => i.item_id !== item.id));
  };

  // const myFormat = (num) => {
  //   return num + units + "  ~  £" + currentPriceOfItem();
  // };

  // const handleAmountChange = (amount) => {
  //   setFormData({ ...formData, amount: amount });
  // };

  const handleIntAmountDecrement = () => {
    let currAmount = formData["amount"];
    setFormData({ ...formData, amount: currAmount - 1 });
  };

  const handleIntAmountIncrement = () => {
    let currAmount = formData["amount"];
    setFormData({ ...formData, amount: currAmount + 1 });
  };

  const handleCompAmountDecrement = () => {
    let currAmount = formData["amount"];
    setFormData({ ...formData, amount: currAmount - 1 });
  };

  const handleCompAmountIncrement = () => {
    let currAmount = formData["amount"];
    setFormData({ ...formData, amount: currAmount + 1 });
  };

  const amountField = () => {
    if (item.price_by_each) {
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
    } else
      return (
        <Button.Group>
          <Button
            type="button"
            icon
            onClick={handleCompAmountDecrement}
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
            onClick={handleCompAmountIncrement}
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
        {/* <Button.Group>
          <Button
            type="button"
            icon
            onClick={handleAmountDecrement}
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
            onClick={handleAmountIncrement}
          >
            <Icon name="plus" />
          </Button>
        </Button.Group> */}
        {/* <NumericInput
          name="amount"
          onChange={handleAmountChange}
          min={min}
          max={max}
          value={formData["amount"]}
          step={stepSize}
          format={myFormat}
          snap
        /> */}
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

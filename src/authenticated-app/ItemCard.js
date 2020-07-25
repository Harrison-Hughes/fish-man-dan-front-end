import React, { useState, useEffect } from "react";
import API from "../adapters/API";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  Form,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import NumericInput from "react-numeric-input";

const ItemCard = ({ item, basket, setBasket }) => {
  const [formData, setFormData] = useState({
    itemID: item.id,
    amount: 0,
    note: "",
  });
  const [addToBasketEnabled, setAddToBasketEnabled] = useState(false);
  const [min, max, stepSize, units] = [0, 5000, 200, "g"];

  useEffect(() => {
    if (formData["amount"] > min) {
      setAddToBasketEnabled(true);
    } else setAddToBasketEnabled(false);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (amount) => {
    setFormData({ ...formData, amount: amount });
  };

  const handleAddToBasket = (event) => {
    event.preventDefault();
    console.log(
      "adding ",
      formData["amount"],
      "of item with ID",
      formData["itemID"],
      "with note",
      formData["note"]
    );
    // let item = basket.find((item) => item.id == formData["itemID"]);
  };

  const myFormat = (num) => {
    return num + units;
  };

  return (
    <Item>
      <Item.Content>
        <Item.Header>{item.name}</Item.Header>
        <Item.Meta>
          <span className="meta">price per unit</span>
        </Item.Meta>
        <Item.Description>{item.description}</Item.Description>
        <Item.Extra>
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
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ItemCard;

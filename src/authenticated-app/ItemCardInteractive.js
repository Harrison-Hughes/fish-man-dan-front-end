import React, { useState, useEffect } from "react";
import { Button, Icon, Item, Form } from "semantic-ui-react";
import NumericInput from "react-numeric-input";
import ItemNotInBasketForm from "./item-card-interactive/ItemNotInBasketForm";
import ItemInBasketForm from "./item-card-interactive/ItemInBasketForm";

const ItemCardInteractive = ({ item, basket, setBasket }) => {
  const [min, max, stepSize, units] = [0, 5000, 200, "g"];

  const itemInBasket = () => {
    return !!basket.find((i) => i.item_id == item.id);
  };

  return (
    <Item>
      <Item.Content>
        <Item.Header>
          {item.name}
          <Icon name="twitter" />
        </Item.Header>
        <Item.Meta>
          <span className="meta">price per unit</span>
        </Item.Meta>
        <Item.Description>{item.description}</Item.Description>
        <Item.Extra>
          {itemInBasket() ? (
            <ItemInBasketForm
              min={min}
              max={max}
              stepSize={stepSize}
              units={units}
              basket={basket}
              setBasket={setBasket}
              item={item}
            />
          ) : (
            <ItemNotInBasketForm
              min={min}
              max={max}
              stepSize={stepSize}
              units={units}
              basket={basket}
              setBasket={setBasket}
              item={item}
            />
          )}
          {/* <ItemNotInBasket
            min={min}
            max={max}
            stepSize={stepSize}
            units={units}
            basket={basket}
            setBasket={setBasket}
            item={item}
          />
          <ItemInBasket
            min={min}
            max={max}
            stepSize={stepSize}
            units={units}
            basket={basket}
            setBasket={setBasket}
            item={item}
          /> */}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ItemCardInteractive;

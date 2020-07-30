import React from "react";
import { Card, Label } from "semantic-ui-react";
import ItemNotInBasketForm from "./item-card-interactive/ItemNotInBasketForm";
import ItemInBasketForm from "./item-card-interactive/ItemInBasketForm";

const ItemCardInteractive = ({
  item,
  basket,
  setBasket,
  selectedItemID,
  setSelectedItemID,
}) => {
  const [min, max, stepSize, units, pricePerStepSize] = [
    0,
    5000,
    500,
    "g",
    4.1,
  ];

  const itemInBasket = () => {
    return !!basket.find((i) => i.item_id == item.id);
  };

  const inBasketLabel = () => {
    if (itemInBasket()) {
      return <Label as="a" color="yellow" corner="right" icon="shop"></Label>;
    }
  };

  const onCardClick = () => {
    if (selectedItemID === item.id) {
      setSelectedItemID(null);
    } else setSelectedItemID(item.id);
  };

  const selectedCardForm = () => {
    if (selectedItemID === item.id)
      return (
        <Card.Content extra>
          {itemInBasket() ? (
            <ItemInBasketForm
              min={min}
              max={max}
              stepSize={stepSize}
              units={units}
              basket={basket}
              setBasket={setBasket}
              item={item}
              pricePerStepSize={pricePerStepSize}
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
              pricePerStepSize={pricePerStepSize}
            />
          )}
        </Card.Content>
      );
  };

  const currentDetailsOfItemInBasket = () => {
    if (itemInBasket()) {
      let currBasketDetails = basket.find((i) => i.item_id === item.id);
      let price = (currBasketDetails.amount / stepSize) * pricePerStepSize;
      return (
        <Card.Content onClick={() => onCardClick()} floated="right" extra>
          <b>
            Basket: {currBasketDetails.amount}
            {units} ~ £{(Math.round(price * 100) / 100).toFixed(2)}
          </b>
          <br />
          <b>
            {!!currBasketDetails.note
              ? "Note: " + currBasketDetails.note
              : null}
          </b>
        </Card.Content>
      );
    }
  };

  return (
    <Card link fluid>
      {inBasketLabel()}
      <Card.Content onClick={() => onCardClick()}>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>
          <span className="meta">
            £{(Math.round(pricePerStepSize * 100) / 100).toFixed(2)} per{" "}
            {stepSize}
            {units}
          </span>
        </Card.Meta>
        <Card.Description>{item.description}</Card.Description>
      </Card.Content>
      {selectedCardForm()}
      {currentDetailsOfItemInBasket()}
    </Card>
  );
};

export default ItemCardInteractive;

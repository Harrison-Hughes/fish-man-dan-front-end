import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";
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
    parseFloat(item.min),
    parseFloat(item.max),
    1,
    "kg",
    4.1,
  ];

  const itemInBasket = () => {
    return !!basket.find((i) => i.item_id === item.id);
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

  const isFluid = () => {
    if (selectedItemID === item.id) return true;
    else return false;
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
        </Card.Content>
      );
    }
  };

  const metaContent = () => {
    if (item.price_by_each) {
      return `£${parseFloat(item.price_per).toFixed(2)} each`;
    } else return `£${parseFloat(item.price_per).toFixed(2)} per. kg`;
  };

  const freshTag = () => {
    if (!!item.fresh)
      return <Label color="olive">{item.fresh.toLowerCase()}</Label>;
  };

  const gradeTag = () => {
    if (!!item.grade)
      return <Label color="orange">{item.grade.toLowerCase()}</Label>;
  };

  const frozenTag = () => {
    if (item.is_frozen) {
      return <Label color="teal">frozen</Label>;
    }
  };

  return (
    <Card
      link
      // fluid={isFluid()}
    >
      {inBasketLabel()}
      <Card.Content onClick={() => onCardClick()}>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>
          <span className="meta">Price: {metaContent()}</span>
        </Card.Meta>
        <Card.Meta>
          <span className="meta">Size: {item.size}</span>
        </Card.Meta>
        <Card.Description>
          {gradeTag()}
          {frozenTag()}
          {freshTag()}
        </Card.Description>
      </Card.Content>
      {selectedCardForm()}
      {currentDetailsOfItemInBasket()}
    </Card>
  );
};

export default ItemCardInteractive;

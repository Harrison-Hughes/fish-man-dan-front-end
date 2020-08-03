import React from "react";
import { Card, Label } from "semantic-ui-react";
import ItemNotInBasketForm from "./item-card-interactive/ItemNotInBasketForm";
import ItemInBasketForm from "./item-card-interactive/ItemInBasketForm";
import ItemInBasketCustomForm from "./item-card-interactive/ItemInBasketCustomForm";
import ItemNotInBasketCustomForm from "./item-card-interactive/ItemNotInBasketCustomForm";

const ItemCardInteractive = ({
  item,
  basket,
  setBasket,
  selectedItemID,
  setSelectedItemID,
}) => {
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

  // const isFluid = () => {
  //   if (selectedItemID === item.id) return true;
  //   else return false;
  // };

  const selectedCardForm = () => {
    if (selectedItemID === item.id)
      if (item.custom_amount) {
        return (
          <Card.Content extra>
            {itemInBasket() ? (
              <ItemInBasketCustomForm
                basket={basket}
                setBasket={setBasket}
                item={item}
              />
            ) : (
              <ItemNotInBasketCustomForm
                basket={basket}
                setBasket={setBasket}
                item={item}
              />
            )}
          </Card.Content>
        );
      } else
        return (
          <Card.Content extra>
            {itemInBasket() ? (
              <ItemInBasketForm
                basket={basket}
                setBasket={setBasket}
                item={item}
              />
            ) : (
              <ItemNotInBasketForm
                basket={basket}
                setBasket={setBasket}
                item={item}
              />
            )}
          </Card.Content>
        );
  };

  const currentDetailsOfItemInBasket = () => {
    if (itemInBasket()) {
      let currBasketDetails = basket.find((i) => i.item_id === item.id);
      if (item.custom_amount) {
        return (
          <Card.Content onClick={() => onCardClick()} floated="right" extra>
            <b>Current request: {currBasketDetails.amount}</b>
          </Card.Content>
        );
      } else
        return (
          <Card.Content onClick={() => onCardClick()} floated="right" extra>
            <b>Currently in basket: x{currBasketDetails.amount}</b>
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
      return <Label color="green">{item.fresh.toLowerCase()}</Label>;
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

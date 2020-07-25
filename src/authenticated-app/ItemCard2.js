import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";

const ItemCard = ({ item }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header as="a">{item.name}</Card.Header>
        <Card.Meta>
          <span className="meta">price per unit</span>
        </Card.Meta>
        <Card.Description>{item.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ItemCard;

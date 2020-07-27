import React from "react";
import { Card } from "semantic-ui-react";

const ItemCardView = ({ item }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>
          <span className="meta">price per unit</span>
        </Card.Meta>
        <Card.Description>{item.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ItemCardView;

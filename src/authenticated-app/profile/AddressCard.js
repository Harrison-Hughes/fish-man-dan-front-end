import React from "react";
import { Card, Feed, Button } from "semantic-ui-react";

const AddressCard = ({ address, user, initDeleteAddressConfirm }) => {
  return (
    <Card key={address.id}>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>{user.full_name}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
          <Feed.Event>{address.line_one}</Feed.Event>
          {!!address.line_two ? (
            <Feed.Event>{address.line_two}</Feed.Event>
          ) : null}
          <Feed.Event>
            {address.town_city}, {address.county}
          </Feed.Event>
          <Feed.Event>{address.postcode}</Feed.Event>
          <Feed.Event>Contact number: {address.contact_number}</Feed.Event>
          <Feed.Event>
            <Button
              basic
              size="tiny"
              onClick={() => console.log("edit")}
              positive
            >
              edit
            </Button>
            <Button
              basic
              size="tiny"
              onClick={() => initDeleteAddressConfirm(address.id)}
              negative
            >
              delete
            </Button>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default AddressCard;

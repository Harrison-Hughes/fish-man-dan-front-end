import React from "react";
import { Card, Feed, Button } from "semantic-ui-react";
import NewAddressCard from "./NewAddressCard";

const AddressBook = ({ user, setError }) => {
  const renderAddressTiles = () => {
    if (user.addresses.length === 0) {
      return (
        <Card>
          <Card.Content>
            <Card.Header>You have no adresses yet - add one below!</Card.Header>
          </Card.Content>
        </Card>
      );
    } else
      return user.addresses.map((address) => (
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
                  onClick={() => console.log("delete")}
                  negative
                >
                  delete
                </Button>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      ));
  };

  const newAddressCard = () => {
    return (
      <NewAddressCard setError={setError} />
      // {/* <Card fluid>
      //   <Card.Content>
      //     <Form></Form>
      //     <Button>Add address</Button>
      //   </Card.Content>
      // </Card> */}
    );
  };

  return (
    <div className="address-book">
      <h1>Address Book</h1>
      <h3>Current addresses</h3>
      <Card.Group>{renderAddressTiles()}</Card.Group>
      <h3>New address</h3>
      {newAddressCard()}
    </div>
  );
};

export default AddressBook;

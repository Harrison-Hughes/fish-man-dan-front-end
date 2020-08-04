import React, { useState } from "react";
import { Card, Feed, Button, Message } from "semantic-ui-react";
import NewAddressCard from "./NewAddressCard";

const AddressBook = ({ user, setError }) => {
  const [message, setMessage] = useState(false);
  const [mode, setMode] = useState("view");
  const [addresses, setAddresses] = useState(user.addresses);

  const renderAddressTiles = () => {
    if (addresses.length === 0) {
      return (
        <Card>
          <Card.Content>
            <Card.Header>You have no adresses yet - add one below!</Card.Header>
          </Card.Content>
        </Card>
      );
    } else
      return addresses.map((address) => (
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

  const renderMode = () => {
    if (mode === "view") {
      return (
        <>
          {!!message ? (
            <Message
              positive={message.type === "positive"}
              negative={message.type === "negative"}
              header={message.header}
            />
          ) : null}
          <h3>Current addresses</h3>
          <Card.Group>{renderAddressTiles()}</Card.Group>
          <Button onClick={() => setMode("add")}>New address</Button>
        </>
      );
    } else if (mode === "add") {
      return (
        <>
          <h3>New address</h3>
          {newAddressCard()}
        </>
      );
    } else if (mode === "edit") {
      return (
        <>
          <h3>Edit address</h3>
          {/* {editAddressCard()} */}
        </>
      );
    }
  };

  const newAddressCard = () => {
    return (
      <NewAddressCard
        user={user}
        setError={setError}
        setMode={setMode}
        setMessage={setMessage}
        addresses={addresses}
        setAddresses={setAddresses}
      />
    );
  };

  return (
    <div className="address-book">
      <h1>Address Book</h1>
      {renderMode()}
    </div>
  );
};

export default AddressBook;

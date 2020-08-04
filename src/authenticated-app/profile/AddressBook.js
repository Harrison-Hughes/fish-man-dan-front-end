import React, { useState } from "react";
import { Card, Button, Message, Confirm } from "semantic-ui-react";
import NewAddressCard from "./NewAddressCard";
import API from "../../adapters/API";
import AddressCard from "./AddressCard";
import EditAddressCard from "./EditAddressCard";

const AddressBook = ({ user, setError }) => {
  const [message, setMessage] = useState(false);
  const [mode, setMode] = useState("view");
  const [addresses, setAddresses] = useState(user.addresses);
  const [addressToEditID, setAddressToEditID] = useState(null);
  const [addressToDeleteID, setAddressToDeleteID] = useState(null);
  const [confirmDeleteAddress, setConfirmDeleteAddress] = useState(false);

  const initDeleteAddressConfirm = (addressID) => {
    setAddressToDeleteID(addressID);
    setConfirmDeleteAddress(true);
  };

  const deleteAddress = () => {
    API.deleteAddress(addressToDeleteID).then((resp) => {
      if (!!resp.success) {
        setAddresses(
          addresses.filter((address) => address.id !== addressToDeleteID)
        );
        setMessage({ type: "positive", header: "Address succesfully deleted" });
      }
    });
  };

  const enterEditAddressMode = (addressID) => {
    setAddressToEditID(addressID);
    setMode("edit");
  };

  const renderAddressTiles = () => {
    if (addresses.length === 0) {
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>
              You have no adresses yet - click "new address" below to add one
            </Card.Header>
          </Card.Content>
        </Card>
      );
    } else
      return addresses.map((address) => (
        <AddressCard
          key={address.id}
          user={user}
          initDeleteAddressConfirm={initDeleteAddressConfirm}
          address={address}
          enterEditAddressMode={enterEditAddressMode}
        />
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
          <br />
          <Button fluid primary onClick={() => setMode("add")}>
            New address
          </Button>
        </>
      );
    } else if (mode === "add") {
      return (
        <>
          <h3>New address</h3>
          <NewAddressCard
            user={user}
            setError={setError}
            setMode={setMode}
            setMessage={setMessage}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        </>
      );
    } else if (mode === "edit") {
      return (
        <>
          <h3>Edit address</h3>
          <EditAddressCard
            address={addresses.find(
              (address) => address.id === addressToEditID
            )}
            setError={setError}
            setMode={setMode}
            setMessage={setMessage}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        </>
      );
    }
  };

  return (
    <div className="address-book">
      <h1>Address Book</h1>
      {renderMode()}
      <Confirm
        open={confirmDeleteAddress}
        content="Are you sure you want to delete this address? This cannot be undone."
        cancelButton="Cancel"
        confirmButton="Delete"
        onCancel={() => {
          setAddressToDeleteID(null);
          setConfirmDeleteAddress(false);
        }}
        onConfirm={() => {
          deleteAddress();
          setConfirmDeleteAddress(false);
        }}
      />
    </div>
  );
};

export default AddressBook;

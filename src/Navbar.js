import React from "react";
import { Popup, Button, Icon } from "semantic-ui-react";

const Navbar = ({ user, logOut, bodyType, setBodyType }) => {
  return (
    <div className="navbar">
      {/* <h3>curr user: {user.full_name}</h3> */}
      <Button animated onClick={() => logOut()}>
        <Button.Content hidden>
          <Icon name="log out" />
        </Button.Content>
        <Button.Content visible>Log out</Button.Content>
      </Button>
      <Button.Group>
        <Popup
          trigger={
            <Button
              icon
              active={bodyType === "browse"}
              onClick={() => setBodyType("browse")}
            >
              <Icon name="eye" />
            </Button>
          }
          content="browse"
          basic
        />
        <Popup
          trigger={
            <Button
              icon
              active={bodyType === "basket"}
              onClick={() => setBodyType("basket")}
            >
              <Icon name="shop" />
            </Button>
          }
          content="basket"
          basic
        />
        <Popup
          trigger={
            <Button
              icon
              active={bodyType === "profile"}
              onClick={() => setBodyType("profile")}
            >
              <Icon name="user" />
            </Button>
          }
          content="profile"
          basic
        />
      </Button.Group>
    </div>
  );
};

export default Navbar;

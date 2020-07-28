import React from "react";
import { Popup, Button, Icon } from "semantic-ui-react";

const Navbar = ({ user, logOut, bodyType, setBodyType }) => {
  return (
    <div className="navbar">
      <h3>curr user: {user.full_name}</h3>
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
              active={bodyType === "view"}
              onClick={() => setBodyType("view")}
            >
              <Icon name="eye" />
            </Button>
          }
          content="view only"
          basic
        />
        <Popup
          trigger={
            <Button
              icon
              active={bodyType === "interact"}
              onClick={() => setBodyType("interact")}
            >
              <Icon name="shop" />
            </Button>
          }
          content="shopping mode"
          basic
        />
      </Button.Group>
    </div>
  );
};

export default Navbar;

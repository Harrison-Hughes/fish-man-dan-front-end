import React from "react";
import { Grid, Popup, Button, Icon } from "semantic-ui-react";

const Navbar = ({ logOut, bodyType, setBodyType }) => {
  return (
    <div className="navbar">
      <Grid columns="equal">
        <Grid.Column floated="left">
          <Button onClick={() => logOut()}>Log out</Button>
        </Grid.Column>
        <Grid.Column>
          <h1>Fish man Dan</h1>
        </Grid.Column>
        <Grid.Column floated="right">
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
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Navbar;

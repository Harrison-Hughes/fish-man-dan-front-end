import React from "react";
import { Popup, Button, Icon, Dropdown } from "semantic-ui-react";

const Navbar = ({ user, logOut, bodyType, setBodyType }) => {
  // const bodyTypeOptions = [
  //   { key: "quick view", icon: "eye", text: "quick view", value: "view" },
  //   {
  //     key: "shop",
  //     icon: "cart plus",
  //     text: "shop",
  //     value: "interact",
  //   },
  //   // { key: "hide", icon: "hide", text: "Hide Post", value: "hide" },
  // ];

  // const bodyTypeToText = () => {
  //   if (bodyType === "view") return "quick view";
  //   else if (bodyType === "interact") return "shop";
  // };

  // const bodyTypeToIcon = () => {
  //   if (bodyType === "view") return "eye";
  //   else if (bodyType === "interact") return "cart plus";
  // };

  // const handleChange = (e, option) => setBodyType(option.value);

  return (
    <div className="navbar">
      <h3>curr user: {user.full_name}</h3>
      <Button animated onClick={() => logOut()}>
        <Button.Content hidden>
          <Icon name="log out" />
        </Button.Content>
        <Button.Content visible>Log out</Button.Content>
      </Button>
      {/* <Dropdown
        text={bodyTypeToText()}
        icon={bodyTypeToIcon()}
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {bodyTypeOptions.map((option) => (
              <Dropdown.Item
                key={option.value}
                {...option}
                onClick={() => setBodyType(option.value)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown> */}
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

import React from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";

const Navbar = ({ user, logOut, setUser, bodyType, setBodyType }) => {
  const bodyTypeOptions = [
    { key: "browse", icon: "eye", text: "quick view", value: "view" },
    {
      key: "shop",
      icon: "shopping basket",
      text: "shop",
      value: "interact",
    },
    // { key: "hide", icon: "hide", text: "Hide Post", value: "hide" },
  ];

  const bodyTypeToLabel = () => {
    if (bodyType === "view") return "browse";
    else if (bodyType === "interact") return "shop";
  };

  const handleChange = (e, option) => setBodyType(option.value);

  return (
    <div className="navbar">
      <h3>curr user: {user.full_name}</h3>
      <Button animated="fade" onClick={() => logOut()}>
        <Button.Content hidden>Log out</Button.Content>
        <Button.Content visible>
          <Icon name="log out" />
        </Button.Content>
      </Button>
      <Dropdown
        onChange={handleChange}
        options={bodyTypeOptions}
        placeholder="Choose an option"
        selection
        value={bodyType}
      />
    </div>
  );
};

export default Navbar;

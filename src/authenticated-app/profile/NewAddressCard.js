import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import API from "../../adapters/API";

const NewAddressCard = ({ setError }) => {
  const [invalidAddressFormFields, setInvalidAddressFormFields] = useState({});

  const [formData, setFormData] = useState({
    line_one: "",
    line_two: "",
    town_city: "",
    county: "",
    postcode: "",
    contact_number: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    API.newAddress(formData)
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .then((resp) => {
        if (resp.error === "invalid form fields") {
          console.log("invalid form fields detected");
          setInvalidAddressFormFields(resp.invalid_fields);
        }
      })
      .catch((errorPromise) => {
        setError(errorPromise);
      });
  };

  const errorObj = (fieldName) => {
    if (!!invalidAddressFormFields[fieldName]) {
      let content = invalidAddressFormFields[fieldName];
      console.log(content);
      return {
        content: `${content}`,
        pointing: "below",
      };
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Address line 1"
        name="line_one"
        onChange={handleChange}
        error={errorObj("line_one")}
      />
      <Form.Input
        label="Address line 2 (optional)"
        name="line_two"
        onChange={handleChange}
        error={errorObj("line_two")}
      />
      <Form.Input
        label="Town/City"
        name="town_city"
        onChange={handleChange}
        error={errorObj("town_city")}
      />
      <Form.Input
        label="County"
        name="county"
        onChange={handleChange}
        error={errorObj("county")}
      />
      <Form.Input
        label="Postcode"
        name="postcode"
        onChange={handleChange}
        error={errorObj("postcode")}
      />
      <Form.Input
        label="Contact number"
        name="contact_number"
        onChange={handleChange}
        error={errorObj("contact_number")}
      />

      <Button content="add address" primary />
    </Form>
  );
};

export default NewAddressCard;

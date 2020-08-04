import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import API from "../../adapters/API";

const NewAddressCard = ({
  user,
  setError,
  setMode,
  setMessage,
  addresses,
  setAddresses,
}) => {
  const [invalidAddressFormFields, setInvalidAddressFormFields] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    recipient_name: user.full_name,
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
    setFormSubmitting(true);
    API.newAddress(formData)
      .then((resp) => {
        if (resp.error === "invalid form fields") {
          console.log("invalid form fields detected");
          setFormSubmitting(false);
          setInvalidAddressFormFields(resp.invalid_fields);
        } else {
          setFormSubmitting(false);
          setMessage({ type: "positive", header: "Address succesfully added" });
          setMode("view");
          setAddresses([...addresses, resp]);
        }
      })
      .catch((errorPromise) => {
        setFormSubmitting(false);
        setError(errorPromise);
      });
  };

  const errorObj = (fieldName) => {
    if (!!invalidAddressFormFields[fieldName]) {
      let content = invalidAddressFormFields[fieldName];
      return {
        content: `${content}`,
        pointing: "above",
      };
    }
  };

  return (
    <Form success={true} onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          required
          label="Recipient"
          name="recipient_name"
          onChange={handleChange}
          error={errorObj("recipient_name")}
          value={formData["recipient_name"]}
        />
        <Form.Input
          required
          label="Contact number"
          name="contact_number"
          onChange={handleChange}
          error={errorObj("contact_number")}
        />
      </Form.Group>
      <Form.Input
        required
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
      <Form.Group widths="equal">
        <Form.Input
          required
          label="Town/City"
          name="town_city"
          onChange={handleChange}
          error={errorObj("town_city")}
        />
        <Form.Input
          required
          label="County"
          name="county"
          onChange={handleChange}
          error={errorObj("county")}
        />
        <Form.Input
          required
          label="Postcode"
          name="postcode"
          onChange={handleChange}
          error={errorObj("postcode")}
        />
      </Form.Group>
      <Button
        disabled={formSubmitting}
        onClick={() => {
          setMode("view");
        }}
        content="cancel"
        negative
        type="button"
      />
      <Button loading={formSubmitting} content="add address" primary />
    </Form>
  );
};

export default NewAddressCard;

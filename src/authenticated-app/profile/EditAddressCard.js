import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import API from "../../adapters/API";

const EditAddressCard = ({
  address,
  setError,
  setMode,
  setMessage,
  addresses,
  setAddresses,
}) => {
  const [invalidAddressFormFields, setInvalidAddressFormFields] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    recipient_name: address.recipient_name,
    line_one: address.line_one,
    line_two: address.line_two,
    town_city: address.town_city,
    county: address.county,
    postcode: address.postcode,
    contact_number: address.contact_number,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitting(true);
    API.editAddress(formData, address.id)
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .then((resp) => {
        if (resp.error === "invalid form fields") {
          console.log("invalid form fields detected");
          setFormSubmitting(false);
          setInvalidAddressFormFields(resp.invalid_fields);
        } else {
          setFormSubmitting(false);
          setMessage({
            type: "positive",
            header: "Address succesfully updated",
          });
          setMode("view");
          let indexOfAddress = addresses.findIndex((a) => a.id === address.id);
          setAddresses(
            Object.assign([], addresses, {
              [indexOfAddress]: formData,
            })
          );
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
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          label="Recipient"
          name="recipient_name"
          onChange={handleChange}
          error={errorObj("recipient_name")}
          value={formData["recipient_name"]}
        />
        <Form.Input
          label="Contact number"
          name="contact_number"
          onChange={handleChange}
          error={errorObj("contact_number")}
          value={formData["contact_number"]}
        />
      </Form.Group>
      <Form.Input
        label="Address line 1"
        name="line_one"
        onChange={handleChange}
        error={errorObj("line_one")}
        value={formData["line_one"]}
      />
      <Form.Input
        label="Address line 2 (optional)"
        name="line_two"
        onChange={handleChange}
        error={errorObj("line_two")}
        value={formData["line_two"]}
      />
      <Form.Group widths="equal">
        <Form.Input
          label="Town/City"
          name="town_city"
          onChange={handleChange}
          error={errorObj("town_city")}
          value={formData["town_city"]}
        />
        <Form.Input
          label="County"
          name="county"
          onChange={handleChange}
          error={errorObj("county")}
          value={formData["county"]}
        />
        <Form.Input
          label="Postcode"
          name="postcode"
          onChange={handleChange}
          error={errorObj("postcode")}
          value={formData["postcode"]}
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
      <Button loading={formSubmitting} content="update address" primary />
    </Form>
  );
};

export default EditAddressCard;

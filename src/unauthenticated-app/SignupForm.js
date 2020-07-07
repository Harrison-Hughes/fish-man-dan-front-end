import React, { useState, useEffect } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import API from "../adapters/API";

const SignupForm = ({ setError, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    full_name: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      "signing up with",
      formData["email"],
      formData["password"],
      formData["password_confirmation"],
      formData["full_name"]
    );
    // API.signin(formData)
    //   .then((user) => {
    //     setUser(user);
    //   })
    //   .then(() => setError(false))
    //   .catch((errorPromise) => {
    //     errorPromise.then(setError);
    //   });
  };

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column verticalAlign="middle">
          <Button content="Log in" icon="sign-in" size="big" />
        </Grid.Column>

        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                icon="user"
                iconPosition="left"
                // label="name"
                placeholder="name"
                name="full_name"
                onChange={handleChange}
              />
              <Form.Input
                icon="mail"
                iconPosition="left"
                // label="e-mail"
                placeholder="e-mail"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon="lock"
                iconPosition="left"
                // label="password"
                placeholder="password"
                type="password"
                name="password"
                onChange={handleChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                // label="password confirm"
                placeholder="password confirmation"
                type="password"
                name="password confirmation"
                onChange={handleChange}
              />
            </Form.Group>

            <Button content="sign up" primary />
          </Form>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  );
};

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default SignupForm;

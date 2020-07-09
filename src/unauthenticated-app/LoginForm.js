import React, { useState, useEffect } from "react";
import { Button, Divider, Form, Grid, Segment, Icon } from "semantic-ui-react";
import API from "../adapters/API";

const LogInForm = ({ setError, setUser, changeToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginEnabled, setLoginEnabled] = useState(false);

  useEffect(() => {
    if (validateEmail(formData["email"]) && formData["password"].length > 0) {
      setLoginEnabled(true);
    } else setLoginEnabled(false);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("logging in with", formData["email"], formData["password"]);
    API.signin(formData)
      .then((user) => {
        setUser(user);
      })
      .then(() => setError(false))
      .catch((errorPromise) => {
        setError(errorPromise);
      });
  };

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              icon="mail"
              iconPosition="left"
              // label="e-mail"
              placeholder="e-mail"
              name="email"
              onChange={handleChange}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              // label="password"
              placeholder="password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Button disabled={!loginEnabled} content="log in" primary />
            {/* <Button circular icon="question circle outline"></Button> */}
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Button
            onClick={() => changeToSignup()}
            content="Sign up"
            icon="signup"
            size="big"
          />
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

export default LogInForm;

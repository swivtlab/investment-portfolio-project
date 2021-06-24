import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../services/api";

const LoginPage = () => {
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const history = useHistory();
  // login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `/api/auth/user-authentication`,
        loginState
      );
      if (res && res.errorCode === null) {
        localStorage.setItem("token", res.token);
      }
      history.push("/home");
    } catch (err) {
      setError(err.msg);
    }
  }
  // form input validation
  const validateForm = () => {
    return loginState.email.length > 0 && loginState.password.length > 0;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push("/home");
    }
  }, [history]);

  return (
    <div className="outer">
      <div className="inner">
        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : (
          ""
        )}
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={loginState.email}
              required={true}
              onChange={(e) =>
                setLoginState({ ...loginState, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label> <br />
            <Form.Control
              type="password"
              className="form-control"
              value={loginState.password}
              required={true}
              onChange={(e) =>
                setLoginState({ ...loginState, password: e.target.value })
              }
            />
          </Form.Group>
          <div className="text-center">
            <Button
              size="sm"
              type="submit"
              className="text-center"
              disabled={!validateForm()}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
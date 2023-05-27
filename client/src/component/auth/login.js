import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth_action";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Loader from "../loader/loader";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  useEffect(() => {
    if (props.error.errors) {
      setError({ ...props.error.errors });
    } else {
      setError({ ...props.error });
    }
  }, [props.error]);

  const login = async (e) => {
    e.preventDefault();
    await props.loginUser(
      { email: username, password },
      props.history,
      clearState
    );
  };
  const clearState = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="Login-page">
      <div className="Login-form-container">
        {error.status === "fail" ? (
          <div class="error-message alert-danger" role="alert">
            {error.message}
          </div>
        ) : null}
        <div className="login-div-header">
          <h3>Login</h3>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="username mt-2">Username</label>
            <input
              type="email"
              placeholder="username"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {error.email && (
              <div className="invalid-feedback">{error.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="username">Password</label>
            <input
              type="password"
              placeholder="---------"
              name="username"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
            onClick={(e) => login(e)}
          />
        </form>
      </div>
      {props.auth.loading === true ? (
        <div className="w-100 h-100 adminpane-product-loader-container">
          <Loader />
        </div>
      ) : null}
    </div>
  );
}
const mapStateTOProps = (state) => ({
  error: state.error,
  auth: state.auth,
});
const enhance = compose(withRouter, connect(mapStateTOProps, { loginUser }));
export default enhance(Login);

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Form = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
      }
      const response = await axios.post(`${import.meta.env.VITE_API_GATEWAY_URL}/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(response);
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userFirstName', response.data.firstName);
      localStorage.setItem('userLastName', response.data.lastName);
      // console.log(response.data);
      // TODO: redirect to home page
      navigate("/");
    } catch (error) {
      setError(error.message || 'An error occurred.');
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link to="/register" className="text-thm">
            Sign Up!
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
          className="form-control"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""

        />
        <label
          className="form-check-label form-check-label"

        >
          Remember me
        </label>

        {/* <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a> */}
      </div>
      {/* End .form-group */}
      <button type="submit" className="btn btn-log w-100 btn-thm" disabled={isSubmitting}>Login</button>
      {/* login button */}
      {error && <div>{error}</div>}
    </form>
  );
};

export default Form;

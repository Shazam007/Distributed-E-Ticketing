import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Form = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    setIsSubmitting(true);
    const checkbox = document.getElementById('termsCheckbox');
    try {
      if (!username || !password || !confirmPassword || !firstname || !email) {
        setError('Enter values for all fields.');
      } else if (password !== confirmPassword) {
        setError('Passwords are not matching.');
      } else if (!checkbox.checked) {
        setError('Please accept the Terms and Privacy Policy.');
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_GATEWAY_URL}/register`, {
          "username": username,
          "firstName": firstname,
          "lastName": lastname,
          "email": email,
          "user_language": "en",
          "password": password,
          "role": "user"
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(response)
        console.log(response.data)
        // TODO: save the token to local and redirect to home page
        navigate("/login");
      }
      // Handle successful signup, e.g., redirect to login page
    } catch (error) {
      setError(error.message || 'An error occurred.');
      console.error('Signup failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
      <div className="heading text-center">
        <h3>Register to your account</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-thm">
            Login
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="row">
        <div className="col-md-6">
          <div className="form-group input-group ">
            <input
              type="text"
              className="form-control"
              required
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="flaticon-user"></i>
              </div>
            </div>
          </div>
        </div>

        {/* End .form-group */}


        <div className="col-md-6">
          <div className="form-group input-group ">
            <input
              type="text"
              className="form-control"
              required
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="flaticon-user"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="text"
          className="form-control"
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}

        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="email"
          className="form-control"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group input-group  ">
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
        </div>

        <div className="col-md-6">
          <div className="form-group input-group  ">
            <input
              type="password"
              className="form-control"
              required
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="flaticon-password"></i>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* End .form-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          id="termsCheckbox"
          className="form-check-input"
          type="checkbox"
          value=""
          required

        />
        <label className="form-check-label form-check-label" >
          I have read and accept the Terms and Privacy Policy?
        </label>
      </div>
      {/* End .form-group */}

      {/* <button type="submit" className="btn btn-log w-100 btn-thm">
        Register
      </button> */}

      <button type="submit" className="btn btn-log w-100 btn-thm" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Signup'}
      </button>

      {error && <div className="alert alert-danger">{error}</div>}
    </form >
  );
};

export default Form;

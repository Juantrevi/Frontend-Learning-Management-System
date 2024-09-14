import { useState, useEffect } from 'react';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { register } from '../../utils/auth.js';
import Swal from "sweetalert2";

function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if all fields are filled and passwords match
    const isValid = firstName && lastName && email && password && password2 && password === password2 && password.length >= 8;
    setIsFormValid(isValid);
    setPasswordError(password !== password2 ? 'Passwords do not match' : '');
    setPasswordLengthError(password.length < 8 ? 'Password must be at least 8 characters long' : '');
  }, [firstName, lastName, email, password, password2]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await register(firstName, lastName, email, password, password2);

    setIsLoading(false);
    if(!result.error){
      navigate('/')
      Swal.fire("Registration successful, you have now been logged in", "", "success")
    }

  };

  return (
    <>
      <BaseHeader />

      <section className="container d-flex flex-column vh-100" style={{ marginTop: '150px' }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Sign up</h1>
                  <span>
                    Already have an account?
                    <Link to="/login/" className="ms-1">
                      Sign In
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                  {/* First Name */}
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name*</label>
                    <input
                      type="text"
                      id="first_name"
                      className="form-control"
                      name="first_name"
                      placeholder="John Doe"
                      required=""
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name*</label>
                    <input
                        type="text"
                        id="last_name"
                        className="form-control"
                        name="last_name"
                        placeholder="John Doe"
                        required=""
                        onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password*</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {password.length < 8 && <div className="text-danger">Password must be at least 8 characters long</div>}
                  </div>
                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password*</label>
                    <input
                      type="password"
                      id="password2"
                      className="form-control"
                      name="password2"
                      placeholder="**************"
                      required=""
                      onChange={(event) => setPassword2(event.target.value)}
                    />
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                  </div>
                  {/* Submit Button */}
                  <div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={!isFormValid || isLoading}>
                        {isLoading ? 'Processing' : 'Register'} <i className={isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-user-plus'}></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Register;
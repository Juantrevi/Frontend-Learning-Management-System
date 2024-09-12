import React from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import {useEffect} from "react";
import {useState} from "react";
import apiInstance from "../../utils/axios.js";
import {RESET_PASSWORD_EP} from "../../utils/constant.js";
import Swal from "sweetalert2";


function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = email;
    setIsFormValid(isValid)
  }, [email]);


  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setEmailSent(true)
    try {
      await apiInstance.get(RESET_PASSWORD_EP + email).then((res) => {
      })
    }catch (error){
      Swal.fire(error, '', 'error')
    }finally {
      Swal.fire('Check your email to reset password', '', 'info')
      //setIsLoading(false)
    }
  }


  return (
    <>
      <BaseHeader />

      <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Forgot Password</h1>
                  <span>
                    Lets help you get back into your account
                  </span>
                </div>
                <form className="needs-validation" noValidate="" onSubmit={handleEmailSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
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

                  <div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={!isFormValid || emailSent}>
                        {emailSent ? 'Email Sent' : 'Reset Password'} <i
                          className={emailSent ? 'fas fa-paper-plane' : 'fas fa-arrow-right'}></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter/>
    </>
  )
}

export default ForgotPassword
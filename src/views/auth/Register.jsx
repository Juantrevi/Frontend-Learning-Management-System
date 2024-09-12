import {useState, useEffect} from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import {Link, useSubmit} from 'react-router-dom'
import apiInstance from "../../utils/axios.js";
import {register} from "../../utils/auth.js";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  console.log(fullName)
  console.log(email)
  console.log(password2)
  console.log(password)


  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    await register(fullName, email, password, password2)
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
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="full_name"
                      className="form-control"
                      name="full_name"
                      placeholder="John Doe"
                      required=""
                      defaultValue={"Testing From Frontend"}
                      onChange={(event) => setFullName(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                      defaultValue={"juantreviranus@gmail.com"}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      defaultValue={"Jmy43525f"}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      defaultValue={"Jmy43525f"}
                      onChange={(event) => setPassword2(event.target.value)}
                    />
                  </div>
                  <div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Sign Up <i className='fas fa-user-plus'></i>
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
  )
}

export default Register
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import {useState, useEffect} from "react";
import apiInstance from "../../utils/axios.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import Swal from "sweetalert2";
import {
  OTP_PARAMS,
  REFRESH_TOKEN_PARAMS,
  PASSWORD_CHANGE_EP,
  UUIDB64_PARAMS
} from "../../utils/constant.js";
import {handleApiError} from "../../utils/handleApiError.js";

function CreateNewPassword() {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [passwordLength, setPasswordLength] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const otp = searchParams.get(OTP_PARAMS)
  const uuidb64 = searchParams.get(UUIDB64_PARAMS)
  const refreshToken = searchParams.get(REFRESH_TOKEN_PARAMS)


  useEffect(() => {
    // Check if passwords match and if they are at least 8 characters long
    const match = password === confirmPassword;
    const length = password.length >= 8 && confirmPassword.length >= 8;

    setPasswordMatch(match);
    setPasswordLength(length);
    setIsFormValid(match && length);
  }, [password, confirmPassword]);

  const handleCreateNewPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('password', password)
    formData.append(OTP_PARAMS, otp)
    formData.append(UUIDB64_PARAMS, uuidb64)
    formData.append(REFRESH_TOKEN_PARAMS, refreshToken)

    try {
      await apiInstance.post(PASSWORD_CHANGE_EP, formData).then((res) => {
        Swal.fire(res.data.message)
        navigate('/login')
      })
    }catch (error){
        handleApiError(error, 'Something went wrong changing the password')
    }finally {
        setIsLoading(false)
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
                  <h1 className="mb-1 fw-bold">Create New Password</h1>
                  <span>
                    Choose a new password for your account
                  </span>
                  {!passwordLength ? <div className="text-danger">*Password should be at least 8 characters long</div> : ''}
                  {!passwordMatch ? <div className="text-danger">*Password dont match</div> : ''}

                </div>
                <form className="needs-validation" noValidate="" onSubmit={handleCreateNewPassword}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>



                  <div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={!isFormValid || isLoading}>
                        {isLoading ? 'Processing' : 'Save New Password'} <i
                          className={isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-check-circle'}></i>
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

export default CreateNewPassword
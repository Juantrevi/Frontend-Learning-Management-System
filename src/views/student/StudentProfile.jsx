import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import {useEffect, useState} from "react";
import useAxios from "../../utils/useAxios.js";
import Toast from "../plugin/Toast.js";

function StudentProfile() {

  const [profile, setProfile] = useState([])
  const [profileData, setProfileData] = useState({
    image: '',
    full_name: '',
    about: '',
    country: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  const fetchProfile = () => {
    useAxios().get(`/user/profile/`).then((res) => {
      setProfile(res.data)
      setProfileData(res.data)
      setImagePreview(res.data.image)
    })
  }

  const handleProfileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value
    })
    console.log(profileData)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setProfileData({
      ...profileData,
      [event.target.name]: selectedFile
    })

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }

    if(selectedFile){
      reader.readAsDataURL(selectedFile)
    }

    console.log(selectedFile)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const res = await useAxios().get(`/user/profile/`)
    const formData = new FormData()

    if(profileData.image && profileData.image !== res.data.image){
      formData.append('image', profileData.image)
    }

    formData.append('full_name', profileData.full_name)
    formData.append('about', profileData.about)
    formData.append('country', profileData.country)

    await useAxios().patch(`/user/profile/`, formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then((res) => {
      Toast().fire({
        title: 'Profile updated',
        icon: "info"
      })
      console.log(profileData.full_name)
      fetchProfile()
    })

  }


  useEffect(() => {
    fetchProfile()
  }, []);



  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              {/* Card */}
              <div className="card">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Profile Details</h3>
                  <p className="mb-0">
                    You have full control to manage your own account setting.
                  </p>
                </div>
                {/* Card body */}
                <form className="card-body" onSubmit={handleFormSubmit}>
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-lg-0">
                      <img
                        src={imagePreview}
                        id="img-uploaded"
                        className="avatar-xl rounded-circle"
                        alt="avatar"
                        style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
                      />
                      <div className="ms-3">
                        <h4 className="mb-0">Your avatar</h4>
                        <p className="mb-0">
                          PNG or JPG no bigger than 800px wide and tall.
                        </p>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            className='form-control mt-3'
                            name="image"
                            id="" />
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h4 className="mb-0">Personal Details</h4>
                    <p className="mb-4">Edit your personal information and address.</p>
                    {/* Form */}
                    <div className="row gx-3">
                      {/* First name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Full Name
                        </label>
                        <input
                          onChange={handleProfileChange}
                          name={'full_name'}
                          type="text"
                          id=""
                          className="form-control"
                          value={profileData.full_name}
                          required=""
                        />
                        {/*<div className="invalid-feedback">Please enter first name.</div>*/}
                      </div>
                      {/* About Me */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="lname">
                          About Me
                        </label>
                        <textarea
                            defaultValue={profileData.about}
                            onChange={handleProfileChange}
                            name="about"
                            placeholder="About me"
                            id=""
                            cols="30"
                            rows="5"
                            className='form-control'></textarea>
                        {/*<div className="invalid-feedback">Please enter last name.</div>*/}
                      </div>

                      {/* Country */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="editCountry">
                          Country
                        </label>
                        <input
                          type="text"
                          onChange={handleProfileChange}
                          name={'country'}
                          id="country"
                          defaultValue={profileData.country}
                          className="form-control"
                          placeholder="Country"
                          required=""
                        />
                        <div className="invalid-feedback">Please choose country.</div>
                      </div>
                      <div className="col-12">
                        {/* Button */}
                        <button className="btn btn-primary" type="submit">
                          Update Profile <i className='fas fa-check-circle'></i>
                        </button>
                      </div>
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

export default StudentProfile
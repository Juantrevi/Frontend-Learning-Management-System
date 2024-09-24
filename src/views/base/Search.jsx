import React from "react";
import {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import useAxios from "../../utils/useAxios.js";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import apiInstance from "../../utils/axios.js";
import Toast from "../plugin/Toast.js";
import CartId from "../plugin/CartId.js";
import GetCurrentAddress from "../plugin/UserCountry.js";
import UserData from "../plugin/UserData.js";
import {CartContext} from "../plugin/Context.js";
import Button from "react-bootstrap/Button";
import BaseHeader from "../partials/BaseHeader.jsx";
import BaseFooter from "../partials/BaseFooter.jsx";
function Search() {



    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const country = GetCurrentAddress()?.country;
    const userId = UserData()?.user_id;
    const cartId = CartId()
    const [cartCount, setCartCount] = useContext(CartContext)
    const [searchQuery, setSearchQuery] = useState('')



    const fetchCourse = async () => {
      setIsLoading(true)
      try {
        await useAxios()
            .get(`/course/course-list/`)
            .then((res) => {
              setCourses(res.data)
              setIsLoading(false)
            });
      }catch (e){
        console.log(e)
        //handleApiError(e)
      }
    }

  const addToCart = async (courseId, userId, price, country, cartId) => {
    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("user_id", userId);
    formData.append("price", price);
    formData.append("country_name", country);
    formData.append("cart_id", cartId);

    await useAxios().post('course/cart/', formData).then((res) => {
      try {

        Toast().fire({
          title: 'Added to cart',
          icon: 'success'
        });

        apiInstance.get(`course/cart-list/${CartId()}`).then((res) => {
          setCartCount(res.data?.length)
        })

      } catch (e) {
        console.log(e);
      }
    });
  };


  //Search feature
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query === ''){
      fetchCourse()
    }else {
      const course = courses.filter((course) => {
        return course.title.toLowerCase().includes(query)
      })
      setCourses(course)
    }
  }



    useEffect(() => {
      fetchCourse()
    }, []);






  return (
    <>
      <BaseHeader />

      <section className="mb-5" style={{ marginTop: "100px" }}>
        <div className="container mb-lg-8 ">
          <div className="row mb-5 mt-3">
            {/* col */}
            <div className="col-12">
              <div className="mb-6">
                <h2 className="mb-1 h1">
                  {searchQuery !== '' ? (
                    <>Showing Results for "{searchQuery}"</>
                  ) : (
                    <>No search active</>
                  )}

                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  className="form-control lg mt-3"
                  placeholder="Search Courses..."
                  name=""
                  id=""
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {courses?.map((course, index) => (
                    <div className="col">
                      {/* Card */}
                      <div className="card card-hover">
                        <Link to={`/course-detail/${course.slug}`}>
                          <img
                              src={course.image}
                              alt="course"
                              className="card-img-top"
                          />
                        </Link>
                        {/* Card Body */}
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <span className="badge bg-info">{course.level}</span>
                              <span className="badge bg-success ms-2">{course.language}</span>
                            </div>
                            <a href="#" className="fs-5">
                              <i className="fas fa-heart text-danger align-middle"/>
                            </a>
                          </div>
                          <h4 className="card-title mb-2">
                            <Link to={`/course-detail/${course.slug}`}
                                  className="text-inherit text-decoration-none text-dark fs-5">
                              {course.title}
                            </Link>
                          </h4>
                          <div className="text-truncate ">
                            <small>By: {course.teacher.full_name}</small> <br/>
                          </div>

                          <small>
                            {course.students?.length} {course.students?.length > 1 ? "Students" : "Student"}
                          </small> <br/>
                          <div className="lh-1 mt-3 d-flex">
                                                <span className="align-text-top">
                                                    <span className="fs-6">
                                                        <Rater total={5} rating={course.average_rating || 0}/>
                                                    </span>
                                                    <span className="text-warning ms-1">{course.average_rating || 0}</span>

                                                    <span className="fs-6 ms-2">({course.reviews?.length} Reviews)</span>
                                                    </span>
                          </div>
                        </div>
                        {/* Card Footer */}
                        <div className="card-footer d-flex flex-column align-items-start">
                          <h5 className="mb-2">${course.price}</h5>
                          <div className="mt-auto d-flex align-items-center">
                            <Button
                                onClick={() => addToCart(
                                    course.id,
                                    userId,
                                    course.price,
                                    country,
                                    cartId)}
                                type={'button'}
                                className={'text-inherit text-decoration-none btn btn-primary me-2'}
                            >
                              <i className="fas fa-shopping-cart text-primary align-middle text-white"/>
                            </Button>
                            <Link
                                to={""}
                                className="text-inherit text-decoration-none btn btn-primary">
                              Enroll Now{" "}
                              <i className="fas fa-arrow-right text-primary align-middle text-white"/>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              <nav className="d-flex mt-5">
                <ul className="pagination">
                  <li className="">
                    <button className="page-link me-1">
                      <i className="ci-arrow-left me-2" />
                      Previous
                    </button>
                  </li>
                </ul>
                <ul className="pagination">
                  <li key={1} className="active">
                    <button className="page-link">1</button>
                  </li>
                </ul>
                <ul className="pagination">
                  <li className={`totalPages`}>
                    <button className="page-link ms-1">
                      Next
                      <i className="ci-arrow-right ms-3" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="my-8 py-lg-8">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
            {/* col */}
            <div className="col-lg-6 col-12 d-none d-lg-block">
              <div className="d-flex justify-content-center pt-4">
                {/* img */}
                <div className="position-relative">
                  <img
                    src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                    alt="image"
                    className="img-fluid mt-n8"
                  />
                  <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg"
                      alt="dollor"
                    />
                  </div>
                  {/* img */}
                  <div className="me-n4 position-absolute top-0 end-0">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg"
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12">
              <div className="text-white p-5 p-lg-0">
                {/* text */}
                <h2 className="h1 text-white">Become an instructor today</h2>
                <p className="mb-0">
                  Instructors from around the world teach millions of students
                  on Geeks. We provide the tools and skills to teach what you
                  love.
                </p>
                <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                  Start Teaching Today <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Search

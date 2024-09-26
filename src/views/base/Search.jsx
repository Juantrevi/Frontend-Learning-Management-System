import React from "react";
import { useEffect, useState} from 'react'
import useAxios from "../../utils/useAxios.js";
import 'react-rater/lib/react-rater.css'
import CartId from "../plugin/CartId.js";
import GetCurrentAddress from "../plugin/UserCountry.js";
import UserData from "../plugin/UserData.js";
import BaseHeader from "../partials/BaseHeader.jsx";
import BaseFooter from "../partials/BaseFooter.jsx";
import CourseCard from "../../components/CourseCard.jsx";

function Search() {

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const country = GetCurrentAddress()?.country;
  const userId = UserData()?.user_id;
  const cartId = CartId();

  const fetchCourse = async () => {
    setIsLoading(true);
    try {
      await useAxios()
          .get(`/course/course-list/`)
          .then((res) => {
            setCourses(res.data);
            setIsLoading(false);
          });
    } catch (e) {
      console.log(e);
    }
  };

  // Pagination
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(courses.length / itemsPerPage)
  const pageNumbers = Array.from(
      {length: totalPages},
      (_, index) => index + 1
      )


  useEffect(() => {
    fetchCourse();
  }, []);

  return (
      <>
        <BaseHeader />
        <section className="mb-5" style={{ marginTop: "100px" }}>
          <div className="container mb-lg-8">
            <div className="row mb-5 mt-3">
              <div className="col-12">
                <div className="mb-6">
                  <h2 className="mb-1 h1">Featured Courses</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <input
                      type="text"
                      className="form-control lg mt-3"
                      placeholder="Search Courses..."
                      onChange={(e) => {
                        const query = e.target.value.toLowerCase();
                        if (query === '') {
                          fetchCourse();
                        } else {
                          const filteredCourses = courses.filter((course) =>
                              course.title.toLowerCase().includes(query)
                          );
                          setCourses(filteredCourses);
                        }
                      }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {currentItems?.map((course, index) => (
                      <CourseCard
                          key={index}
                          course={course}
                          userId={userId}
                          country={country}
                          cartId={cartId}
                      />
                  ))}
                </div>

                <nav className="d-flex mt-5">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link me-1" onClick={() => setCurrentPage(currentPage - 1)}>
                        <i className="ci-arrow-left me-2" />
                        Previous
                      </button>
                    </li>
                  </ul>
                  <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(number)}>{number}</button>
                        </li>
                    ))}
                  </ul>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link ms-1" onClick={() => setCurrentPage(currentPage + 1)}>
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
          <div className="container">
            <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
              <div className="col-lg-6 col-12 d-none d-lg-block">
                <div className="d-flex justify-content-center pt-4">
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

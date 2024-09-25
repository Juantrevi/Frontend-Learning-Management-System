// src/components/CourseCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Button from 'react-bootstrap/Button';
import useAxios from "../utils/useAxios.js";
import Toast from "../views/plugin/Toast.js";
import apiInstance from "../utils/axios.js";
import CartId from "../views/plugin/CartId.js";
import { CartContext } from "../views/plugin/Context.js";

const CourseCard = ({ course, userId, country, cartId }) => {
  const [cartCount, setCartCount] = useContext(CartContext);

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
          setCartCount(res.data?.length);
        });

      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div className="col">
      <div className="card card-hover">
        <Link to={`/course-detail/${course.slug}`}>
          <img src={course.image} alt="course" className="card-img-top" />
        </Link>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-info">{course.level}</span>
              <span className="badge bg-success ms-2">{course.language}</span>
            </div>
            <a href="#" className="fs-5">
              <i className="fas fa-heart text-danger align-middle" />
            </a>
          </div>
          <h4 className="card-title mb-2">
            <Link to={`/course-detail/${course.slug}`} className="text-inherit text-decoration-none text-dark fs-5">
              {course.title}
            </Link>
          </h4>
          <div className="text-truncate">
            <small>By: {course.teacher.full_name}</small> <br />
          </div>
          <small>
            {course.students?.length} {course.students?.length > 1 ? 'Students' : 'Student'}
          </small> <br />
          <div className="lh-1 mt-3 d-flex">
            <span className="align-text-top">
              <span className="fs-6">
                <Rater total={5} rating={course.average_rating || 0} />
              </span>
              <span className="text-warning ms-1">{course.average_rating || 0}</span>
              <span className="fs-6 ms-2">({course.reviews?.length} Reviews)</span>
            </span>
          </div>
        </div>
        <div className="card-footer d-flex flex-column align-items-start">
          <h5 className="mb-2">${course.price}</h5>
          <div className="mt-auto d-flex align-items-center">
            <Button
              onClick={() => addToCart(course.id, userId, course.price, country, cartId)}
              type={'button'}
              className={'text-inherit text-decoration-none btn btn-primary me-2'}
            >
              <i className="fas fa-shopping-cart text-primary align-middle text-white" />
            </Button>
            <Link to={`/course-detail/${course.slug}`} className="text-inherit text-decoration-none btn btn-primary">
              Enroll Now <i className="fas fa-arrow-right text-primary align-middle text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
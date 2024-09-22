import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import apiInstance from "../../utils/axios.js";
import CartId from "../plugin/CartId.js";

function BaseHeader() {
    const [cart, setCart] = useState([])

    const fetchCartItem = async () => {
        try {
            await apiInstance.get(`course/cart-list/${CartId()}`).then((res) => {
                console.log(res.data)
                setCart(res.data)
            })
        }catch (e){
            console.log(e)
        }
    }


    useEffect(() => {
        fetchCartItem()
    }, []);


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        BulbEd
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center text-nowrap" to="/pages/contact-us/">
                                    <i className="fas fa-phone me-1 flex-shrink-0"></i> Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center text-nowrap" to="/pages/about-us/">
                                    <i className="fas fa-address-card me-1 flex-shrink-0"></i> About Us
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center text-nowrap"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-chalkboard-user me-1 flex-shrink-0"></i> Instructor
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/dashboard/`}>
                                            <i className="bi bi-grid-fill me-1 flex-shrink-0"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/courses/`}>
                                            <i className="fas fa-shopping-cart me-1 flex-shrink-0"></i> My Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/create-course/`}>
                                            <i className="fas fa-plus me-1 flex-shrink-0"></i> Create Course
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/reviews/`}>
                                            <i className="fas fa-star me-1 flex-shrink-0"></i> Reviews
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/question-answer/`}>
                                            <i className="fas fa-envelope me-1 flex-shrink-0"></i> Q/A
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/students/`}>
                                            <i className="fas fa-users me-1 flex-shrink-0"></i> Students
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/earning/`}>
                                            <i className="fas fa-dollar-sign me-1 flex-shrink-0"></i> Earning
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/instructor/profile/`}>
                                            <i className="fas fa-gear me-1 flex-shrink-0"></i> Settings & Profile
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center text-nowrap"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-graduation-cap me-1 flex-shrink-0"></i> Student
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/student/dashboard/`}>
                                            <i className="bi bi-grid-fill me-1 flex-shrink-0"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/student/courses/`}>
                                            <i className="fas fa-shopping-cart me-1 flex-shrink-0"></i> My Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/student/wishlist/`}>
                                            <i className="fas fa-heart me-1 flex-shrink-0"></i> Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/student/question-answer/`}>
                                            <i className="fas fa-envelope me-1 flex-shrink-0"></i> Q/A
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap" to={`/student/profile/`}>
                                            <i className="fas fa-gear me-1 flex-shrink-0"></i> Profile & Settings
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex align-items-center text-nowrap w-100" role="search">
                            <input
                                className="form-control me-2 flex-grow-1"
                                type="search"
                                placeholder="Search Courses"
                                aria-label="Search Courses"
                            />
                            <button className="btn btn-outline-success flex-shrink-0" type="submit">
                                Search <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <Link to="/login/" className="btn btn-primary d-flex align-items-center text-nowrap ms-2" type="submit">
                            Login <i className="fas fa-sign-in-alt"></i>
                        </Link>
                        <Link to="/register/" className="btn btn-primary d-flex align-items-center text-nowrap ms-2" type="submit">
                            Register <i className="fas fa-user-plus"></i>
                        </Link>
                        <Link className="btn btn-success ms-2 d-flex align-items-center text-nowrap" to="/cart/">
                            Cart ({cart.length}) <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BaseHeader;
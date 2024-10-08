import {useContext} from "react";
import { Link } from "react-router-dom";
import {CartContext} from "../plugin/Context.js";
import {useAuthStore} from "../../store/auth.js";

function BaseHeader() {

    const [cartCount, setCartCount] = useContext(CartContext)
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])

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
                                            <i className="fas fa-shopping-cart me-1 flex-shrink-0"></i> My StudentCourses
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
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap"
                                              to={`/student/dashboard/`}>
                                            <i className="bi bi-grid-fill me-1 flex-shrink-0"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap"
                                              to={`/student/courses/`}>
                                            <i className="fas fa-shopping-cart me-1 flex-shrink-0"></i> My StudentCourses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap"
                                              to={`/student/wishlist/`}>
                                            <i className="fas fa-heart me-1 flex-shrink-0"></i> Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap"
                                              to={`/student/question-answer/`}>
                                            <i className="fas fa-envelope me-1 flex-shrink-0"></i> Q/A
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap"
                                              to={`/student/profile/`}>
                                            <i className="fas fa-gear me-1 flex-shrink-0"></i> Profile & Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center text-nowrap"
                                              to={`/logout/`}>
                                            <i className="fa-solid fa-door-open me-1 flex-shrink-0"></i> Log out
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex align-items-center text-nowrap w-100 mb-2 mb-lg-0" role="search">
                            <input
                                className="form-control me-2 flex-grow-1"
                                type="search"
                                placeholder="Search StudentCourses"
                                aria-label="Search StudentCourses"
                            />
                            <button className="btn btn-outline-success flex-shrink-0" type="submit">
                                Search <i className="fas fa-search"></i>
                            </button>
                        </form>
                        {isLoggedIn() ?
                        <div className="d-flex flex-column flex-lg-row">
                            <Link className="btn btn-success ms-0 ms-lg-2 mb-2 mb-lg-0 d-flex align-items-center justify-content-center flex-shrink-0" to="/cart/">
                                Cart ({cartCount}) <i className="ms-1 fas fa-shopping-cart"></i>
                            </Link>
                        </div>
                        :
                        <div className="d-flex flex-column flex-lg-row">
                            <Link to="/login/" className="btn btn-primary ms-0 ms-lg-2 mb-2 mb-lg-0 d-flex align-items-center w-100" type="submit">
                                Login <i className="ms-1 fas fa-sign-in-alt"></i>
                            </Link>
                            <Link to="/register/" className="btn btn-primary ms-0 ms-lg-2 mb-2 mb-lg-0 d-flex align-items-center w-100" type="submit">
                                Register <i className="ms-1 fas fa-user-plus"></i>
                            </Link>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BaseHeader;
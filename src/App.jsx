import {useState, useEffect} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper.jsx";
import PrivateRoute from "./layouts/PrivateRoute.jsx";
import Register from "./views/auth/Register.jsx";
import Login from "./views/auth/Login.jsx";
import Logout from "./views/auth/Logout.jsx";
import {useAuthStore} from "./store/auth.js";
import ForgotPassword from "./views/auth/ForgotPassword.jsx";
import CreateNewPassword from "./views/auth/CreateNewPassword.jsx";
import Index from "./views/base/Index.jsx";
import CourseDetail from "./views/base/CourseDetail.jsx";
import Cart from "./views/base/Cart.jsx";
import {CartContext} from "./views/plugin/Context.js";
import apiInstance from "./utils/axios.js";
import CartId from "./views/plugin/CartId.js";
import Checkout from "./views/base/Checkout.jsx";
import Success from "./views/base/Success.jsx";
import Search from "./views/base/Search.jsx";
import ChangePassword from "./views/student/ChangePassword.jsx";
import StudentProfile from "./views/student/StudentProfile.jsx";
import StudentDashboard from "./views/student/StudentDashboard.jsx";
import StudentCourses from "./views/student/StudentCourses.jsx";
import StudentCourseDetail from "./views/student/StudentCourseDetail.jsx";
import Wishlist from "./views/student/Wishlist.jsx";
import {ProfileContext} from "./views/plugin/Context.js";
import useAxios from "./utils/useAxios.js";
import TeacherDashboard from "./views/instructor/TeacherDashboard.jsx";
import TeacherCourses from "./views/instructor/TeacherCourses.jsx";
import TeacherReview from "./views/instructor/TeacherReview.jsx";
import Students from "./views/instructor/Students.jsx";
import Earning from "./views/instructor/Earning.jsx";
import Orders from "./views/instructor/Orders.jsx";
import Coupon from "./views/instructor/Coupon.jsx";
import TeacherNotification from "./views/instructor/TeacherNotification.jsx";
import QA from "./views/instructor/QA.jsx";

function App() {

    const [cartCount, setCartCount] = useState(0)
    const [profile, setProfile] = useState(0)

    useEffect(() => {

        useAxios().get(`course/cart-list/${CartId()}`).then((res) => {
            setCartCount(res.data?.length)
        })

        useAxios().get(`/user/profile/`).then((res) => {
            setProfile(res.data)
        })
    }, []);


    return (
        <CartContext.Provider value={[cartCount, setCartCount]}>
            <ProfileContext.Provider value={[profile, setProfile]}>
                <BrowserRouter>
                    <MainWrapper>
                        <Routes>
                            {/*Auth routes*/}
                            <Route path={'/register/'} element={<Register/>} />
                            <Route path={'/login/'} element={<Login/>} />
                            <Route path={'/logout/'} element={<Logout/>} />
                            <Route path={'/forgot-password/'} element={<ForgotPassword/>} />
                            <Route path={'/create-new-password/'} element={<CreateNewPassword/>} />
                            <Route path={'/create-new-password/'} element={<CreateNewPassword/>} />
                            {/*Base routes*/}
                            <Route path={'/'} element={<Index/>} />
                            <Route path={'/course-detail/:slug'} element={<CourseDetail/>} />
                            <Route path={'/cart/'} element={<Cart />} />
                            <Route path={'/checkout/:order_oid/'} element={<Checkout />} />
                            <Route path={'/payment-success/:order_oid/'} element={<Success />} />
                            <Route path={'/search/'} element={<Search />} />
                            <Route path={'/student/change-password/'} element={<ChangePassword />} />
                            <Route path={'/student/profile/'} element={<StudentProfile />} />
                            <Route path={'/student/dashboard/'} element={<StudentDashboard />} />
                            <Route path={'/student/courses/'} element={<StudentCourses />} />
                            <Route path={'/student/courses/:enrollment_id'} element={<StudentCourseDetail />} />
                            <Route path={'/student/wishlist/'} element={<Wishlist />} />

                            {/*Teacher*/}
                            <Route path={'/instructor/dashboard/'} element={<TeacherDashboard />} />
                            <Route path={'/instructor/courses/'} element={<TeacherCourses />} />
                            <Route path={'/instructor/reviews/'} element={<TeacherReview />} />
                            <Route path={'/instructor/students/'} element={<Students />} />
                            <Route path={'/instructor/earning/'} element={<Earning />} />
                            <Route path={'/instructor/orders/'} element={<Orders />} />
                            <Route path={'/instructor/coupons/'} element={<Coupon />} />
                            <Route path={'/instructor/question-answer/'} element={<QA />} />

                        </Routes>
                    </MainWrapper>
                </BrowserRouter>
            </ProfileContext.Provider>
        </CartContext.Provider>
    );
}

export default App

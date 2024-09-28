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
import Profile from "./views/student/Profile.jsx";

function App() {

    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        apiInstance.get(`course/cart-list/${CartId()}`).then((res) => {
            setCartCount(res.data?.length)
        })
    }, []);


    return (
        <CartContext.Provider value={[cartCount, setCartCount]}>
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
                    <Route path={'/student/profile/'} element={<Profile />} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
        </CartContext.Provider>
    );
}

export default App

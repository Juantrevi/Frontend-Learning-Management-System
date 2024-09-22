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

function App() {

    return (
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
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App

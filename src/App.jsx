import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper.jsx";
import PrivateRoute from "./layouts/PrivateRoute.jsx";
import Register from "./views/auth/Register.jsx";
import Login from "./views/auth/Login.jsx";

function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route path={'/register/'} element={<Register/>} />
                    <Route path={'/login/'} element={<Login/>} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App

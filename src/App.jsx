import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper.jsx";
import PrivateRoute from "./layouts/PrivateRoute.jsx";
import Register from "./views/auth/Register.jsx";

function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route path={'/register/'} element={<Register/>} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App

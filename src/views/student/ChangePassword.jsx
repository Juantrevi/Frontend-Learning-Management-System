import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import {useState} from "react";
import Toast from "../plugin/Toast.js";
import UserData from "../plugin/UserData.js";
import useAxios from "../../utils/useAxios.js";



function ChangePassword() {

    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    });

    const handlePasswordChange = (event) => {
        setPassword({
            ...password,
            [event.target.name]: event.target.value,
        });
    };

    const changePasswordSubmit = async (e) => {
        e.preventDefault()
        if (password.confirm_new_password !== password.new_password){
            Toast().fire({
                icon: 'error',
                title: 'Password does not match'
            })
        }

        // TODO
        // if (password.old_password === password.new_password){
        //     Toast().fire({
        //         icon: 'error',
        //         title: 'Use a different password'
        //     })
        // }

        const formData = new FormData;
        formData.append('user_id', UserData()?.user_id)
        formData.append('old_password', password.old_password)
        formData.append('new_password', password.new_password)

        await useAxios().post('user/change-password/', formData).then((res) => {
            console.log(res.data)

            Toast().fire({
                icon: res.data.icon,
                title: res.data.message
            })

        })
    }






    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5">
                <div className="container">
                    {/* Header Here */}
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        {/* Sidebar Here */}
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            {/* Card */}
                            <div className="card">
                                {/* Card header */}
                                <div className="card-header">
                                    <h3 className="mb-0">Change Password</h3>
                                </div>
                                {/* Card body */}
                                <div className="card-body">
                                    <div>
                                        <form className="row gx-3 needs-validation" noValidate="" onSubmit={changePasswordSubmit}>
                                            {/* First name */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="fname">
                                                    Old Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="Old Password"
                                                    className="form-control"
                                                    placeholder="**************"
                                                    required=""
                                                    onChange={handlePasswordChange}
                                                    value={password.old_password}
                                                    name={'old_password'}
                                                />
                                            </div>
                                            {/* Last name */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="lname">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="New Password"
                                                    className="form-control"
                                                    placeholder="**************"
                                                    required=""
                                                    onChange={handlePasswordChange}
                                                    value={password.new_password}
                                                    name={'new_password'}
                                                />
                                            </div>

                                            {/* Country */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="editCountry">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="Confirm New Password"
                                                    className="form-control"
                                                    placeholder="**************"
                                                    required=""
                                                    onChange={handlePasswordChange}
                                                    value={password.confirm_new_password}
                                                    name={'confirm_new_password'}
                                                />
                                            </div>
                                            <div className="col-12">
                                                {/* Button */}
                                                <button className="btn btn-primary" type="submit">
                                                    Save New Password <i className='fas fa-check-circle'></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default ChangePassword
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import useAxios from "../../utils/useAxios.js";
import Toast from "../plugin/Toast.js";
import CartId from "../plugin/CartId.js";
import CourseCard from "../../components/CourseCard.jsx";
import UserData from "../plugin/UserData.js";
import GetCurrentAddress from "../plugin/UserCountry.js";

function Wishlist() {

    const [wishList, setWishList] = useState([])
    const country = GetCurrentAddress()?.country;
    const cartId = CartId()

    const fetchWishList = () => {
        useAxios().get(`student/wishlist/`).then((res) => {
            setWishList(res.data)
            console.log(res.data)
        })
    }


    useEffect(() => {
        fetchWishList()
    }, []);


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

                        <div className="col-lg-6 col-md-8 col-12">
                            <h4 className="mb-0 mb-4"> <i className='fas fa-heart'></i> Wishlist </h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-8 g-4">

                                        {/*Looping through courses*/}
                                        {wishList?.map((course, index) => (
                                            <div className="col" key={index}>
                                                <CourseCard
                                                    course={course?.course}
                                                    userId={UserData().id}
                                                    country={country}
                                                    cartId={cartId}
                                                />
                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter/>
        </>
    )
}

export default Wishlist
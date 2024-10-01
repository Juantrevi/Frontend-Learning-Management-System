import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import moment from "moment";

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import useAxios from "../../utils/useAxios.js";

function StudentCourses() {
    const [courses, setCourses] = useState([])
    const [stats, setStats] = useState([])
    const [fetching, setFetching] = useState(true)

    const fetchData = async () => {
        setFetching(true)

        useAxios().get(`/student/enrolled-courses/`).then((res) => {
            setCourses(res.data)
        })
        setFetching(false)
    }


    const handleSearch = (event) => {
        event.preventDefault()
        const query = event.target.value.toLowerCase()
        if (query === ''){
            fetchData()
        }else {
            const filtered = courses.filter((c) => {
                return c.course.title.toLowerCase().includes(query)
            });
            setCourses(filtered)
        }
    }

    useEffect(() => {
        fetchData()
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
                        <div className="col-lg-9 col-md-8 col-12">
                            <h4 className="mb-0 mb-4"> <i className='fas fa-shopping-cart'></i> My StudentCourses</h4>

                            {fetching === true && (
                                <p className={'mt-3 p-3'}>Loading...</p>
                            )}

                            {fetching === false && (

                                <div className="card mb-4">
                                    <div className="card-header">
                                        <h3 className="mb-0">StudentCourses</h3>
                                        <span>
                                        Start watching courses now from your dashboard page.
                                    </span>
                                    </div>
                                    <div className="card-body">
                                        <form className="row gx-3">
                                            <div className="col-lg-12 col-md-12 col-12 mb-lg-0 mb-2">
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    placeholder="Search Your StudentCourses"
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="table-responsive overflow-y-hidden">
                                        <table
                                            className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                                            <thead className="table-light">
                                            <tr>
                                                <th>StudentCourses</th>
                                                <th>Date Enrolled</th>
                                                <th>Lectures</th>
                                                <th>Completed</th>
                                                <th>Action</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {courses.map((c, index) => (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <a href="#">
                                                                    <img
                                                                        src={c.course.image}
                                                                        alt="course"
                                                                        className="rounded img-4by3-lg"
                                                                        style={{
                                                                            width: "100px",
                                                                            height: "100px",
                                                                            borderRadius: "50%",
                                                                            objectFit: "cover"
                                                                        }}
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="ms-3">
                                                                <h4 className="mb-1 h5">
                                                                    <a href="#"
                                                                       className="text-inherit text-decoration-none text-dark">
                                                                        {c.course.title}
                                                                    </a>
                                                                </h4>
                                                                <ul className="list-inline fs-6 mb-0">
                                                                    {/*<li className="list-inline-item">*/}
                                                                    {/*    <i className='bi bi-clock-history'></i>*/}
                                                                    {/*    <span className='ms-1'>1hr 30 Mins</span>*/}
                                                                    {/*</li>*/}

                                                                    <li className="list-inline-item">
                                                                        <i className='bi bi-translate'></i>
                                                                        <span
                                                                            className='ms-1'>{c.course.language}</span>
                                                                    </li>

                                                                    <li className="list-inline-item">
                                                                        <i className='bi bi-reception-4'></i>
                                                                        <span className='ms-1'>{c.course.level}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><p className='mt-4'>{moment(c.date).format("D MMM, YYYY")}</p>
                                                    </td>
                                                    <td><p className='mt-4'>{c.lectures?.length}</p></td>
                                                    <td><p className='mt-4'>{c.completed_lesson?.length}</p></td>
                                                    <td>
                                                        <button
                                                            className={`btn btn-sm mt-4 ${c.completed_lesson?.length < 1 ? 'btn-success' : 'btn-primary'}`}>
                                                            {c.completed_lesson?.length < 1 ? 'Start Course' : 'Continue Course'}
                                                            <i className='ms-1 fas fa-arrow-right'></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {courses.length < 1 && (
                                                <p className={'mt-4 p-4'}>No courses found</p>
                                            )}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default StudentCourses
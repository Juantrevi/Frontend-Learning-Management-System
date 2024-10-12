import React, { useEffect, useState } from 'react';
import Sidebar from './Partials/Sidebar';
import Header from './Partials/Header';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import useAxios from "../../utils/useAxios.js";
import Rater from "../../components/Rater.jsx";
import moment from "moment";
import Toast from "../plugin/Toast.js";

function TeacherReview() {
    const [reviews, setReviews] = useState([]);
    const [reply, setReply] = useState('');

    const fetchReviews = async () => {
        useAxios().get(`teacher/review-list/`).then((res) => {
            setReviews(res.data);
        });
    };

    const handleSubmitReply = async (e, reviewId) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        try {
            await useAxios().patch(`teacher/review-detail/${reviewId}`, { reply: reply }).then((res) => {
                fetchReviews();
                Toast().fire({
                    icon: 'info',
                    title: 'Reply sent'
                });
                setReply('');
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <>
            <BaseHeader />
            <section className="pt-5 pb-5">
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="card mb-4">
                                <div className="card-header d-lg-flex align-items-center justify-content-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="mb-0">Reviews</h3>
                                        <span>You have full control to manage your own account setting.</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form className="row mb-4 gx-2">
                                        <div className="col-xl-7 col-lg-6 col-md-4 col-12 mb-2 mb-lg-0">
                                            <select className="form-select">
                                                <option value="">ALL</option>
                                                <option value="How to easily create a website">
                                                    How to easily create a website
                                                </option>
                                                <option value="Grunt: The JavaScript Task...">
                                                    Grunt: The JavaScript Task...
                                                </option>
                                                <option value="Vue js: The JavaScript Task...">
                                                    Vue js: The JavaScript Task...
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 col-md-4 col-12 mb-2 mb-lg-0">
                                            <select className="form-select">
                                                <option value="">Rating</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-4 col-12 mb-2 mb-lg-0">
                                            <select className="form-select">
                                                <option value="">Sort by</option>
                                                <option value="Newest">Newest</option>
                                                <option value="Oldest">Oldest</option>
                                            </select>
                                        </div>
                                    </form>
                                    <ul className="list-group list-group-flush">
                                        {reviews?.map((r) => (
                                            <li className="list-group-item p-4 shadow rounded-3 mb-4" key={r.id}>
                                                <div className="d-flex">
                                                    <img
                                                        src={r.profile.image}
                                                        alt="avatar"
                                                        className="rounded-circle avatar-lg"
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                            borderRadius: "50%",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                    <div className="ms-3 mt-2">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h4 className="mb-0">{r.profile.full_name}</h4>
                                                                <span>{moment(r.date).format('DD MMM YYYY')}</span>
                                                            </div>
                                                            <div>
                                                                <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Report Abuse">
                                                                    <i className="fe fe-flag" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <span className="fs-6 me-1 align-top">
                                                                <Rater rating={r.rating} total={5} />
                                                            </span>
                                                            <span className="me-1">for</span>
                                                            <span className="h5">{r?.course?.title}</span>
                                                            <p className="mt-2">
                                                                <span className='fw-bold me-2'>Review <i className='fas fa-arrow-right'></i></span>
                                                                {r.review}
                                                            </p>
                                                            <p className="mt-2">
                                                                <span className='fw-bold me-2'>Response <i className='fas fa-arrow-right'></i></span>
                                                                {r.reply || 'NO REPLY'}
                                                            </p>
                                                            <p>
                                                                <button className="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${r.id}`} aria-expanded="false" aria-controls={`collapse${r.id}`}>
                                                                    Send Response
                                                                </button>
                                                            </p>
                                                            <div className="collapse" id={`collapse${r.id}`}>
                                                                <div className="card card-body">
                                                                    <form onSubmit={(e) => handleSubmitReply(e, r.id)}>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="reply" className="form-label">Write Response</label>
                                                                            <textarea
                                                                                id="reply"
                                                                                cols="30"
                                                                                className='form-control'
                                                                                rows="4"
                                                                                value={reply}
                                                                                onChange={(e) => setReply(e.target.value)}
                                                                            ></textarea>
                                                                        </div>
                                                                        <button type="submit" className="btn btn-primary">
                                                                            Send Response <i className='fas fa-paper-plane'></i>
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BaseFooter />
        </>
    );
}

export default TeacherReview;
import React, {useEffect, useState, useRef} from 'react'
import {useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player'
import Toast from "../plugin/Toast.js";


import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import useAxios from "../../utils/useAxios.js";
import UserData from "../plugin/UserData.js";
import moment from "moment";




function StudentCourseDetail() {

  // Models for bootstrap START
  const [course, setCourse] = useState([])
  const param = useParams()
  const [variantItem, setVariantItem] = useState(null)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [markAsCompletedStatus, setMarkAsCompletedStatus] = useState({})
  const [createNewNote, setCreateNote] = useState({title: "", note: ""})
  const [selectedNote, setSelectedNote] = useState(null)
  const [createMessage, setCreateMessage] = useState({title: '', message: ''})
  const [questions, setQuestions] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [createReview, setCreateReview] = useState({rating: 1, review: ''})
  const [studentReview, setStudentReview] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (variant_item) => {
    setShow(true);
    setVariantItem(variant_item)
  }

  const [noteShow, setNoteShow] = useState(false);
  const handleNoteClose = () => setNoteShow(false);
  const handleNoteShow = (note) => {
    setNoteShow(true);
    setSelectedNote(note)

  }

  const [ConversationShow, setConversationShow] = useState(false);
  const handleConversationClose = () => setConversationShow(false);
  const handleConversationShow = (conversation) => {
    setConversationShow(true);
    setSelectedConversation(conversation)

  }

  const [addQuestionShow, setAddQuestionShow] = useState(false)
  const handleQuestionClose = () => {setAddQuestionShow(false)}
  const handleQuestionShow = () => {setAddQuestionShow(true)}

  // Models for bootstrap END

  const lastElementRef = useRef()


  const fetchCourseDetail = async () => {
    useAxios().get(`/student/course-detail/${param.enrollment_id}/`).then((res) => {
      setCourse(res.data)
      setStudentReview(res.data.review[0])

      setQuestions(res.data.question_answer)
      const percentageCompleted = (res.data.completed_lesson.length/res.data.lectures.length*100)
      setCompletionPercentage(percentageCompleted?.toFixed(0))
    });
  };

  const handleMarkLessonAsCompleted = (variantItemId) => {
    const key = `lecture_${variantItemId}`
    setMarkAsCompletedStatus({
      ...markAsCompletedStatus,
      [key]: 'Updating'
    })

    const formData = new FormData()
    formData.append(['course_id'], course.course?.id)
    formData.append(['variant_item_id'], variantItemId)

    useAxios().post(`student/course-completed/`, formData).then((res) => {
      fetchCourseDetail()
      setMarkAsCompletedStatus({
        ...markAsCompletedStatus,
        [key]: 'Updated'
      })
    })

  }

  const handleNoteChange = (event) => {
    setCreateNote({
      ...createNewNote,
      [event.target.name]: event.target.value

    })
  }

  const handleSubmitCreateNote = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append(['enrollment_id'], param.enrollment_id)
    formData.append(['title'], createNewNote.title)
    formData.append(['note'], createNewNote.note)

    try {
      await useAxios().post(`/student/course-note/${param.enrollment_id}/`, formData).then((res) => {
        fetchCourseDetail()
        Toast().fire({
          icon: "success",
          title: "Note created successfully!"
        })
        setCreateNote({ title: "", note: "" });
      })
    }catch (e){
      console.log(e)
    }
  }

  const handleSubmitForEditNote = (e, noteId) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append(['enrollment_id'], param.enrollment_id)
    formData.append(['title'], createNewNote.title || selectedNote?.title)
    formData.append(['note'], createNewNote.note || selectedNote?.note)

    useAxios().patch(`/student/course-note-detail/${param.enrollment_id}/${noteId}/`, formData).then((res) => {
      fetchCourseDetail()
      Toast().fire({
        icon: "info",
        title: "Note updated successfully"
      })
      setCreateNote({ title: "", note: "" });
    })
  }

  const handleDeleteNote = (noteId) => {
    useAxios().delete(`/student/course-note-detail/${param.enrollment_id}/${noteId}/`).then((res) => {
      fetchCourseDetail()
      Toast().fire({
        icon: "warning",
        title: "Note Deleted"
      })
    })
  }

  const handleMessageChange = (event) => {
    setCreateMessage({
      ...createMessage,
      [event.target.name]: event.target.value

    })
  }

  const handleSaveQuestion = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append(['course_id'], course.course?.id)
    formData.append(['title'], createMessage.title)
    formData.append(['message'], createMessage.message)

    await useAxios().post(`/student/question-answer-list-create/${course.course?.id}/`, formData).then((res) => {
      console.log(res.data)
      fetchCourseDetail()
      Toast().fire({
        icon: "info",
        title: res.data.message
      })
      setCreateMessage({ title: "", message: "" });
    })
  }

  const sendNewMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(['course_id'], course.course?.id);
    formData.append(['message'], createMessage.message);
    formData.append(['qa_id'], selectedConversation?.qa_id);

    try {
      await useAxios().post(`/student/question-answer-message-create/`, formData).then((res) => {
        setSelectedConversation(res.data.question);
        // Reset the message input
        setCreateMessage({ ...createMessage, message: "" });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchQuestion =  (event) => {
    const query = event.target.value.toLowerCase()
    if(query === '' ){
      fetchCourseDetail()
    }else {
      const filtered = questions.filter((question) => {
        return question.title.toLowerCase().includes(query)
      })
      setQuestions(filtered)
    }
  }

  const handleReviewChange = (event) => {
    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value,
    })
  }

  const handleCreateReviewSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();

      formData.append(['course_id'], course?.course?.course_id)
      formData.append(['rating'], createReview.rating)
      formData.append(['review'], createReview.review)

    useAxios().post(`/student/rate-course/`, formData).then((res) => {
      Toast().fire({
        icon: 'info',
        title: 'Review updated successfully'
      })

    })
  }

  const handleUpdateReviewSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append(['course_id'], course?.course?.course_id)
    formData.append(['rating'], createReview.rating || studentReview?.rating)
    formData.append(['review'], createReview.review || studentReview?.review)

    useAxios().patch(`/student/review-detail/${studentReview?.id}/`, formData).then((res) => {
      Toast().fire({
        icon: 'info',
        title: 'Review updated'
      })
    })

  }


  useEffect(() => {
    fetchCourseDetail()
  }, []);

  useEffect(() => {
    if(lastElementRef.current){
      lastElementRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (studentReview?.id) {
      setCreateReview({
        rating: studentReview.rating,
        review: studentReview.review
      });
    }
  }, [studentReview]);

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
              {/* <section className="bg-blue py-7">
                <div className="container">
                  <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' width={"100%"} height={600} />
                </div>
              </section> */}
              <section className="mt-4">
                <div className="container">
                  <div className="row">
                    {/* Main content START */}
                    <div className="col-12">
                      <div className="card shadow rounded-2 p-0 mt-n5">
                        {/* Tabs START */}
                        <div className="card-header border-bottom px-4 pt-3 pb-0">
                          <ul
                            className="nav nav-bottom-line py-0"
                            id="course-pills-tab"
                            role="tablist"
                          >
                            {/* Tab item */}
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button className="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">
                                Course Lectures
                              </button>
                            </li>
                            {/* Tab item */}
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button
                                className="nav-link mb-2 mb-md-0"
                                id="course-pills-tab-2"
                                data-bs-toggle="pill"
                                data-bs-target="#course-pills-2"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-2"
                                aria-selected="false"
                              >
                                Notes
                              </button>
                            </li>
                            {/* Tab item */}
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button
                                className="nav-link mb-2 mb-md-0"
                                id="course-pills-tab-3"
                                data-bs-toggle="pill"
                                data-bs-target="#course-pills-3"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-3"
                                aria-selected="false"
                              >
                                Discussion
                              </button>
                            </li>

                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button
                                className="nav-link mb-2 mb-md-0"
                                id="course-pills-tab-4"
                                data-bs-toggle="pill"
                                data-bs-target="#course-pills-4"
                                type="button"
                                role="tab"
                                aria-controls="course-pills-4"
                                aria-selected="false"
                              >
                                Leave a Review
                              </button>
                            </li>
                          </ul>
                        </div>
                        {/* Tabs END */}
                        {/* Tab contents START */}
                        <div className="card-body p-sm-4">
                          <div className="tab-content" id="course-pills-tabContent">
                            {/* Content START */}
                            <div
                              className="tab-pane fade show active"
                              id="course-pills-1"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-1"
                            >
                              {/* Accordion START */}
                              <div
                                className="accordion accordion-icon accordion-border"
                                id="accordionExample2"
                              >
                                {completionPercentage}%
                                <div className="progress mb-3">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${completionPercentage}%` }}
                                    aria-valuenow={completionPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >

                                  </div>

                                </div>
                                {/* Item */}

                                {course?.curriculum?.map((c, index) => (
                                    <div className="accordion-item mb-3 bg-light p-3">
                                      <h6 className="accordion-header font-base" id="heading-1">
                                        <button
                                            className="accordion-button p-3 w-100 bg-light btn border fw-bold rounded d-sm-flex d-inline-block collapsed"
                                            type="button"
                                            data-bs-toggle={`collapse`}
                                            data-bs-target={`#collapse-${c.variant_id}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse-${c.variant_id}`}
                                        >
                                          {c.title}
                                          <span className="small ms-0 ms-sm-2">
                                            ({c.variant_items?.length > 1 ? `${c.variant_items?.length} Lectures` : `${c.variant_items?.length} Lecture`})
                                          </span>
                                        </button>
                                      </h6>
                                      <div
                                          id={`collapse-${c.variant_id}`}
                                          className="accordion-collapse collapse show"
                                          aria-labelledby="heading-1"
                                          data-bs-parent="#accordionExample2"
                                      >
                                        <div className="accordion-body mt-3">
                                          {/* Course lecture */}

                                          {c.variant_items?.map((l, index) => (
                                              <>
                                                <div className="d-flex justify-content-between align-items-center">
                                                  <div className="position-relative d-flex align-items-center justify-content-between w-100">
                                                    <Button
                                                        onClick={() => handleShow(l)}
                                                        className="btn btn-danger-soft btn-round btn-sm mb-0  position-static">
                                                      <i className="fas fa-play me-0" />
                                                    </Button>
                                                    <span
                                                        className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light flex-grow-1"
                                                        onClick={() => handleShow(l)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                      {l.title}
                                                    </span>
                                                    <div className="d-flex align-items-center ms-2">
                                                      <p className="mb-0 flex-shrink-0">{l?.content_duration || '0m 0s'}</p>

                                                      <input
                                                          onChange={() => handleMarkLessonAsCompleted(l.variant_item_id)}
                                                          checked={course.completed_lesson?.some((cl) => cl.variant_item.id === l.id)}
                                                          type="checkbox"
                                                          className="form-check-input ms-2"
                                                          name=""
                                                          id="" />

                                                    </div>
                                                  </div>
                                                </div>
                                                <hr/>
                                              </>
                                          ))}

                                          {/* Divider */}

                                        </div>
                                      </div>
                                    </div>
                                ))}


                              </div>
                              {/* Accordion END */}
                            </div>

                            <div
                                className="tab-pane fade"
                                id="course-pills-2"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-2"
                            >
                              <div className="card">
                                <div className="card-header border-bottom p-0 pb-3">
                                  <div className="d-sm-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 p-3">All Notes</h4>
                                    {/* Add Note Modal */}
                                    <button type="button" className="btn btn-primary me-3" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                      Add Note <i className='fas fa-pen'></i>
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex={-1}
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                              Add New Note <i className='fas fa-pen'></i>
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"/>
                                          </div>
                                          <div className="modal-body">
                                            <form onSubmit={handleSubmitCreateNote}>
                                              <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                  Note Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={'title'}
                                                    onChange={handleNoteChange}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">
                                                  Note Content
                                                </label>
                                                <textarea
                                                    className='form-control'
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                    name={'note'}
                                                    onChange={handleNoteChange}
                                                >

                                                </textarea>
                                              </div>
                                              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal"><i className='fas fa-arrow-left'></i> Close</button>
                                              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Note <i className='fas fa-check-circle'></i></button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body p-0 pt-3">
                                  {/* Note item start */}

                                  {course?.note?.length < 1 ?
                                      <>
                                        <div className={'p-4'}>
                                        <p >There are no notes for this course. <br></br>
                                          <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal"
                                                  data-bs-target="#exampleModal">
                                            Add Note  <i className='fas fa-pen'></i>
                                          </button>
                                        </p>
                                        </div>

                                      </>
                                      :
                                      <>
                                        {course?.note?.map((n, index) => (
                                            <div className="row g-4 p-3">
                                              <div className="col-sm-11 col-xl-11 shadow p-3 m-3 rounded">
                                                <h5> {n.title}</h5>
                                                <p>
                                                  {n.note}
                                                </p>
                                                {/* Buttons */}
                                                <div className="hstack gap-3 flex-wrap">
                                                  <a onClick={() => handleNoteShow(n)} className="btn btn-success mb-0">
                                                    <i className="bi bi-pencil-square me-2"/> Edit
                                                  </a>
                                                  <a
                                                      className="btn btn-danger mb-0"
                                                      onClick={() => handleDeleteNote(n.note_id)}
                                                  >
                                                    <i className="bi bi-trash me-2"/> Delete
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                        ))}
                                      </>
                                  }



                                  <hr/>
                                </div>
                              </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="course-pills-3"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-3"
                            >
                              <div className="card">
                                {/* Card header */}
                                <div className="card-header border-bottom p-0 pb-3">
                                  {/* Title */}
                                  <h4 className="mb-3 p-3">Discussion</h4>
                                  <form className="row g-4 p-3">
                                    {/* Search */}
                                    <div className="col-sm-6 col-lg-9">
                                      <div className="position-relative">
                                        <input
                                            className="form-control pe-5 bg-transparent"
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                            onChange={handleSearchQuestion}
                                        />
                                        <button
                                            className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
                                            type="submit"

                                        >

                                          <i className="fas fa-search fs-6 "/>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                      <a
                                          onClick={handleQuestionShow}
                                          className="btn btn-primary mb-0 w-100"
                                          data-bs-toggle="modal"
                                        data-bs-target="#modalCreatePost"
                                      >
                                        Ask Question
                                      </a>
                                    </div>
                                  </form>
                                </div>
                                {/* Card body */}
                                <div className="card-body p-0 pt-3">
                                  <div className="vstack gap-3 p-3">

                                    {/* Question item START */}
                                    {questions?.map((q, index) => (
                                        <div className="shadow rounded-3 p-3" key={index}>
                                          <div className="d-sm-flex justify-content-sm-between mb-3">
                                            <div className="d-flex align-items-center">
                                              <div className="avatar avatar-sm flex-shrink-0">
                                                <img
                                                    src={q.profile.image}
                                                    className="avatar-img rounded-circle"
                                                    alt="avatar"
                                                    style={{
                                                      width: "60px",
                                                      height: "60px",
                                                      borderRadius: "50%",
                                                      objectFit: "cover"
                                                    }}
                                                />
                                              </div>
                                              <div className="ms-2">
                                                <h6 className="mb-0">
                                                  <a href="#" className='text-decoration-none text-dark'>{q.profile.full_name}</a>
                                                </h6>
                                                <small>{moment(q.date).format("DD MMM, YYYY")}</small>
                                              </div>
                                            </div>
                                          </div>
                                          <h5>{q.title}</h5>
                                          <button className='btn btn-primary btn-sm mb-3 mt-3'
                                                  onClick={() => {handleConversationShow(q)}}>Join Conversation <i
                                              className='fas fa-arrow-right'></i></button>
                                        </div>
                                    ))}


                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="course-pills-4"
                                role="tabpanel"
                                aria-labelledby="course-pills-tab-4"
                            >
                              <div className="card">
                                {/* Card header */}
                                <div className="card-header border-bottom p-0 pb-3">
                                  {/* Title */}
                                  <h4 className="mb-3 p-3">Leave a Review</h4>
                                  <div className="mt-2">

                                    {studentReview?.id ? (
                                        <form className="row g-3 p-3" onSubmit={handleUpdateReviewSubmit}>

                                          {/* Rating */}
                                          <div className="col-12 bg-light-input">
                                            <select
                                                id="inputState2"
                                                className="form-select js-choice"
                                                onChange={handleReviewChange}
                                                name={'rating'}
                                                value={createReview.rating}
                                            >
                                              <option value={1}>★☆☆☆☆ (1/5)</option>
                                              <option value={2}>★★☆☆☆ (2/5)</option>
                                              <option value={3}>★★★☆☆ (3/5)</option>
                                              <option value={4}>★★★★☆ (4/5)</option>
                                              <option value={5}>★★★★★ (5/5)</option>
                                            </select>
                                          </div>
                                          {/* Message */}
                                          <div className="col-12 bg-light-input">
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            placeholder="Your review"
                                            rows={3}
                                            onChange={handleReviewChange}
                                            name={'review'}
                                            defaultValue={createReview.review || studentReview?.review}
                                        />
                                          </div>
                                          {/* Button */}
                                          <div className="col-12">
                                            <button type="submit" className="btn btn-primary mb-0">
                                              Update Review
                                            </button>
                                          </div>
                                        </form>
                                    ) : (
                                        <form className="row g-3 p-3" onSubmit={handleCreateReviewSubmit}>

                                          {/* Rating */}
                                          <div className="col-12 bg-light-input">
                                            <select
                                                id="inputState2"
                                                className="form-select js-choice"
                                                onChange={handleReviewChange}
                                                name={'rating'}
                                                defaultValue={createReview.rating}
                                            >
                                              <option value={1}>★☆☆☆☆ (1/5)</option>
                                              <option value={2}>★★☆☆☆ (2/5)</option>
                                              <option value={3}>★★★☆☆ (3/5)</option>
                                              <option value={4}>★★★★☆ (4/5)</option>
                                              <option value={5}>★★★★★ (5/5)</option>
                                            </select>
                                          </div>
                                          {/* Message */}
                                          <div className="col-12 bg-light-input">
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            placeholder="Your review"
                                            rows={3}
                                            onChange={handleReviewChange}
                                            name={'review'}
                                            defaultValue={createReview.review}
                                        />
                                          </div>
                                          {/* Button */}
                                          <div className="col-12">
                                            <button type="submit" className="btn btn-primary mb-0">
                                              Post Review
                                            </button>
                                          </div>
                                        </form>
                                    )}


                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Lecture Modal */}
      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: {variantItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer url={variantItem?.file}
                       controls
                       playing
                       width={"100%"}
                       height={"100%"}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Note Edit Modal */}
      <Modal show={noteShow} size='lg' onHide={handleNoteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Note: {selectedNote?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmitForEditNote(e, selectedNote?.note_id)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Note Title</label>
              <input
                  onChange={handleNoteChange}
                  defaultValue={selectedNote?.title}
                  name='title'
                  type="text"
                  className="form-control"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Note Content</label>
              <textarea
                  onChange={handleNoteChange}
                  defaultValue={selectedNote?.note}
                  name='note'
                  className='form-control'
                  cols="30"
                  rows="10"></textarea>
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={handleNoteClose}><i
                className='fas fa-arrow-left'></i> Close
            </button>
            <button type="submit" className="btn btn-primary" >Save Note <i className='fas fa-check-circle'></i></button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Conversation Modal */}
      <Modal show={ConversationShow} size='lg' onHide={handleConversationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: {selectedConversation?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border p-2 p-sm-4 rounded-3">
            <ul className="list-unstyled mb-0" style={{ overflowY: "scroll", height: "500px" }}>

              {selectedConversation?.messages?.map((m, index) => (
                  <li className="comment-item mb-3">
                    <div className="d-flex">
                      <div className="avatar avatar-sm flex-shrink-0">
                        <a href="#">
                          <img className="avatar-img rounded-circle"
                               src={m?.profile?.image?.startsWith('http://localhost:8000')
                                   ?
                                   m.profile.image
                                   :
                                   `http://localhost:8000${m.profile.image}`}
                               style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover"}}
                               alt="womans image"/>
                        </a>
                      </div>
                      <div className="ms-2">
                        {/* Comment by */}
                        <div className="bg-light p-3 rounded w-100">
                          <div className="d-flex w-100 justify-content-center">
                            <div className="me-2 ">
                              <h6 className="mb-1 lead fw-bold">
                                <a href="#!" className='text-decoration-none text-dark'> {m?.profile?.full_name} </a><br/>
                                <span style={{fontSize: "12px", color: "gray"}}>{moment(m.date).format('DD MMM, YYYY')} - {moment(m.date).fromNow()}</span>
                              </h6>
                              <p className="mb-0 mt-3  ">{m?.message}
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </li>
              ))}

              <div ref={lastElementRef}>

              </div>

            </ul>

              <form className="w-100 d-flex" onSubmit={sendNewMessage}>
                <textarea
                  name="message"
                  className="one form-control pe-4 bg-light w-75"
                  onChange={handleMessageChange}
                  value={createMessage.message}
                  id="autoheighttextarea"
                  rows="2"
                  placeholder="Answer"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendNewMessage(e);
                    }
                  }}
                />
                <button className="btn btn-primary ms-2 mb-0 w-25" type="submit">
                  Post <i className="fas fa-paper-plane"></i>
                </button>
              </form>

            {/*<form class="w-100">*/}
            {/*  <input name='title' type="text" className="form-control mb-2" placeholder='Question Title'/>*/}
            {/*  <textarea name='message' class="one form-control pe-4 mb-2 bg-light" id="autoheighttextarea" rows="5"*/}
            {/*            placeholder="What's your question?"></textarea>*/}
            {/*  <button class="btn btn-primary mb-0 w-25" type="button">Post <i className='fas fa-paper-plane'></i>*/}
            {/*  </button>*/}
            {/*</form>*/}

          </div>
        </Modal.Body>
      </Modal>

      {/*Ask question Modal*/}
      <Modal show={addQuestionShow} size='lg' onHide={handleQuestionClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveQuestion}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
              <input
                  onChange={handleMessageChange}
                  value={createMessage.title}
                  name='title'
                  type="text"
                  className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Question</label>
              <textarea
                  onChange={handleMessageChange}
                  value={createMessage.message}
                  name='message'
                  className='form-control'
                  cols="30"
                  rows="10"></textarea>
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={handleQuestionClose}><i className='fas fa-arrow-left'></i> Close</button>
            <button type="submit" className="btn btn-primary" onClick={handleQuestionClose} >Save Question <i className='fas fa-check-circle'></i></button>
          </form>
        </Modal.Body>
      </Modal>

      <BaseFooter />
    </>
  )
}

export default StudentCourseDetail

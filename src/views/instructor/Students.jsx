import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import {useEffect, useState} from "react";
import useAxios from "../../utils/useAxios.js";
import moment from "moment";

function Students() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    useAxios().get(`/teacher/students-list/`).then((res) => {
        setStudents(res.data);
    })
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
              {/* Card */}
              <div className="card mb-4">
                {/* Card body */}
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="mb-0">Students</h3>
                    <span>Meet people taking your course.</span>
                  </div>
                  {/* Nav */}
                </div>
              </div>
              {/* Tab content */}
              <div className="row">

                {students?.map((student, index) => (
                    <div className="col-lg-4 col-md-6 col-12">
                    <div className="card mb-4">
                        <div className="card-body">
                          <div className="text-center">
                            <img
                                src={`http://localhost:8000/${student?.image}`}
                                className="rounded-circle avatar-xl mb-3"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                alt="avatar"
                            />
                            <h4 className="mb-1">{student?.full_name}</h4>
                            <p className="mb-0">
                              {" "}
                              <i className="fas fa-map-pin me-1"/> {student?.country}{" "}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between py-2 mt-4 fs-6">
                            <span>Enrolled</span>
                            <span className="text-dark">{moment(student?.date).format('DD MMM YYYY')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}


              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter/>
    </>
  );
}

export default Students;

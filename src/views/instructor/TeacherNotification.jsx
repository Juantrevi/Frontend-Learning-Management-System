import {useState, useEffect, useCallback} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "../plugin/Toast.js";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios.js";
import moment from "moment";

function TeacherNotification() {

  const [notifications, setNotifications] = useState([]);

  const api = useAxios();

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await api.get("/teacher/notification-list/");
      setNotifications(res.data);
    } catch (error) {
      await Toast().fire({
        icon: 'error', title: 'Failed to fetch notifications'
      });
    }
  }, [api]);

  // Mark notification as seen
  const markAsSeen = async (notificationId) => {
    try {
      await api.patch(`/teacher/notification-detail/${notificationId}/`, {seen: true});
      await fetchNotifications();
    } catch (error) {
      await Toast().fire({
        icon: 'error', title: 'Failed to mark notification as seen'
      });
    }
  };

  // Mark notification as unseen
  const markAsUnseen = async (notificationId) => {
    try {
      await api.patch(`/teacher/notification-detail/${notificationId}/`, {seen: false});
      await fetchNotifications();
    } catch (error) {
      await Toast().fire({
        icon: 'error', title: 'Failed to mark notification as unseen'
      });
    }
  };


  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await api.delete(`/teacher/notification-detail/${notificationId}/`);
      await fetchNotifications();
      await Toast().fire({
        icon: 'warning', title: 'Notification deleted successfully'
      });
    } catch (error) {
      await Toast().fire({
        icon: 'error', title: 'Failed to delete notification'
      });
    }
  };


  useEffect(() => {
    fetchNotifications();
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
                {/* Card header */}
                <div className="card-header d-lg-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Notifications</h3>
                    <span>Manage all your notifications from here</span>
                  </div>
                </div>

                {notifications?.map((notification, index) => (

                <div className="card-body" key={index}>
                {/* List group */}
                <ul className="list-group list-group-flush">
                  {/* List group item */}
                  <li className="list-group-item p-4 shadow rounded-3">
                    <div className="d-flex">
                      <div className="ms-3 mt-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="mb-0">{notification?.type}</h4>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="mt-1">
                              <span className="me-2 fw-bold">
                                Date: <span className="fw-light">{moment(notification?.date).format('DD MMM, YYYY')}</span>
                              </span>
                          </p>
                          <p>
                            {notification?.seen === false ? (
                                <>
                                  <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                      onClick={() => markAsSeen(notification?.id)}
                                  >
                                    Mark as Seen <i className="fas fa-check"></i>
                                  </button>
                                </>
                            ) : (
                                <>
                                  <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                      onClick={() => markAsUnseen(notification?.id)}
                                  >
                                    Mark as Unseen <i className="fas fa-times"></i>
                                  </button>
                                </>
                            )}
                            <button
                                className="btn btn-outline-danger ms-2"
                                type="button"
                                onClick={() => deleteNotification(notification?.id)}
                            >
                              Delete <i className="fas fa-trash"></i>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
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

export default TeacherNotification;

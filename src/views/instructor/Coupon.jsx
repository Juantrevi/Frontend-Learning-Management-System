import { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "../plugin/Toast.js";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios.js";
import moment from "moment";

function Coupon() {

  // State declarations
  const [show, setShow] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponForm, setCouponForm] = useState({ code: '', discount: 0 });
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  const api = useAxios();


  // Fetch coupons
  const fetchCoupons = useCallback(async () => {
    try {
      const res = await api.get("/teacher/coupon-list/");
      setCoupons(res.data);
    } catch (error) {
      Toast().fire({
        icon: 'error',
        title: 'Failed to fetch coupons'
      });
    }
  }, [api]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);


  // Modal handlers
  const handleClose = () => {
    setShow(false);
    setSelectedCouponId(null);
    setCouponForm({ code: '', discount: 0 });
  };
  const handleShow = (coupon) => {
    setSelectedCouponId(coupon.id);
    setCouponForm({ code: coupon.code, discount: coupon.discount });
    setShow(true);
  };
  const handleAddCouponClose = () => {
    setShowAddCoupon(false);
    setCouponForm({ code: '', discount: 0 });
  };
  const handleAddCouponShow = () => setShowAddCoupon(true);


  // Form handlers
  const handleCouponFormChange = (e) => {
    const { name, value } = e.target;
    setCouponForm(prev => ({
      ...prev,
      [name]: name === 'discount' ? Number(value) : value
    }));
  };


  // API interaction handlers
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/teacher/coupon-list/", couponForm);
      fetchCoupons();
      handleAddCouponClose();
      Toast().fire({
        icon: 'success',
        title: 'Coupon Created Successfully'
      });
    } catch (error) {
      Toast().fire({
        icon: 'error',
        title: 'Failed to create coupon'
      });
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      await api.delete(`/teacher/coupon-detail/${couponId}/`);
      fetchCoupons();
      Toast().fire({
        icon: 'warning',
        title: 'Coupon Deleted Successfully'
      });
    } catch (error) {
      Toast().fire({
        icon: 'error',
        title: 'Failed to delete coupon'
      });
    }
  };

  const handleCouponUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/teacher/coupon-detail/${selectedCouponId}/`, couponForm);
      fetchCoupons();
      handleClose();
      Toast().fire({
        icon: 'success',
        title: 'Coupon updated Successfully'
      });
    } catch (error) {
      Toast().fire({
        icon: 'error',
        title: 'Failed to update coupon'
      });
    }
  };


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
                      <h3 className="mb-0">Coupons</h3>
                      <span>Manage all your coupons from here</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleAddCouponShow}
                    >
                      Add Coupon
                    </button>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {coupons.map((coupon) => (
                          <li key={coupon.id} className="list-group-item p-4 shadow rounded-3 mb-4">
                            <div className="d-flex">
                              <div className="ms-3 mt-2">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div>
                                    <h4 className="mb-0">{coupon.code}</h4>
                                    <span>{coupon.used_by?.length || 0} Student(s)</span>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p className="mt-2">
                                <span className="me-2 fw-bold">
                                  Discount:{" "}
                                  </span>
                                  <span className="fw-light">{coupon.discount}% Discount</span>

                                  </p>
                                  <p className="mt-1">
                                <span className="me-2 fw-bold">
                                  Date Created:{" "}
                                  </span>
                                  <span className="fw-light">{moment(coupon.date).format('DD MMM YYYY')}</span>

                                  </p>
                                  <p>
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => handleShow(coupon)}
                                    >
                                      Update Coupon
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCoupon(coupon.id)}
                                        className="btn btn-danger ms-2"
                                        type="button"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </p>
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Update Coupon - <span className="fw-bold">{couponForm.code}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleCouponUpdate}>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Code
                </label>
                <input
                    type="text"
                    id="code"
                    placeholder="Code"
                    value={couponForm.code}
                    className="form-control"
                    name="code"
                    onChange={handleCouponFormChange}
                />
                <label htmlFor="discount" className="form-label mt-3">
                  Discount
                </label>
                <input
                    type="number"
                    id="discount"
                    placeholder="Discount"
                    value={couponForm.discount}
                    className="form-control"
                    name="discount"
                    onChange={handleCouponFormChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Coupon <i className="fas fa-check-circle"></i>
              </button>
              <Button className="ms-2" variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={showAddCoupon} onHide={handleAddCouponClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Coupon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleCouponSubmit}>
              <div className="mb-3">
                <label htmlFor="newCode" className="form-label">
                  Code
                </label>
                <input
                    type="text"
                    id="newCode"
                    placeholder="Code"
                    value={couponForm.code}
                    className="form-control"
                    name="code"
                    onChange={handleCouponFormChange}
                />
                <label htmlFor="newDiscount" className="form-label mt-3">
                  Discount
                </label>
                <input
                    type="number"
                    id="newDiscount"
                    placeholder="Discount"
                    value={couponForm.discount}
                    className="form-control"
                    name="discount"
                    onChange={handleCouponFormChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Coupon <i className="fas fa-plus"></i>
              </button>
              <Button
                  className="ms-2"
                  variant="secondary"
                  onClick={handleAddCouponClose}
              >
                Close
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        <BaseFooter />
      </>
);
}

export default Coupon;

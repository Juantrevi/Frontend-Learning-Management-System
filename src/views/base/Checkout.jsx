import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import apiInstance from "../../utils/axios.js";
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import CartId from "../plugin/CartId.js";
import Toast from "../plugin/Toast.js";
import { CartContext } from "../plugin/Context.js";
import { userId } from "../../utils/constant.js";
import Button from "react-bootstrap/Button";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Cookies from 'js-cookie';

function Checkout() {
    const [order, setOrder] = useState([]);
    const [coupon, setCoupon] = useState([]);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const navigate = useNavigate();
    const param = useParams();

    const fetchCheckOutOrder = async () => {
        try {
            await apiInstance.get(`order/checkout/${param.order_oid}/`).then((res) => {
                setOrder(res.data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const applyCoupon = async () => {
        const formData = new FormData();
        formData.append('order_oid', order?.oid);
        formData.append('coupon_code', coupon);

        try {
            await apiInstance.post(`order/coupon/`, formData).then((res) => {
                setOrder(res.data);
                fetchCheckOutOrder();
                Toast().fire({
                    icon: res.data.icon,
                    title: res.data.message
                });
            });
        } catch (e) {
            Toast().fire({
                icon: 'error',
                title: 'Coupon does not exist'
            });
        }
    };

    const initialOptions = {
        clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID,
        currency: "EUR",
        intent: 'capture'
    };

    const payWithStripe = (event) => {
        setPaymentLoading(true);
        event.target.form.submit();
    };

    useEffect(() => {
        fetchCheckOutOrder();
    }, [param.order_oid]);

    return (
        <>
            <BaseHeader />
            <section className="py-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bg-light p-4 text-center rounded-3">
                                <h1 className="m-0">Checkout</h1>
                                <div className="d-flex justify-content-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb breadcrumb-dots mb-0">
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Home</a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Courses</a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Cart</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Checkout
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-5">
                <div className="container">
                    <div className="row g-4 g-sm-5">
                        <div className="col-xl-8 mb-4 mb-sm-0">
                            <div className="alert alert-warning alert-dismissible d-flex justify-content-between align-items-center fade show py-2 pe-2" role="alert">
                                <div>
                                    <i className="bi bi-exclamation-octagon-fill me-2" />
                                    Review your courses before payment
                                </div>
                                <button type="button" className="btn btn-warning mb-0 text-primary-hover text-end" data-bs-dismiss="alert" aria-label="Close" >
                                    <i className="bi bi-x-lg text-white" />
                                </button>
                            </div>
                            <div className="p-4 shadow rounded-3 mt-4">
                                <h5 className="mb-0 mb-3">Courses</h5>
                                <div className="table-responsive border-0 rounded-3">
                                    <table className="table align-middle p-4 mb-0">
                                        <tbody className="border-top-2">
                                            {order?.order_items?.map((o, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-lg-flex align-items-center">
                                                            <div className="w-100px w-md-80px mb-2 mb-md-0">
                                                                <img
                                                                    src={o.course.image}
                                                                    style={{
                                                                        width: "100px",
                                                                        height: "70px",
                                                                        objectFit: "cover"
                                                                    }} className="rounded" alt=""/>
                                                            </div>
                                                            <h6 className="mb-0 ms-lg-3 mt-2 mt-lg-0">
                                                                <a href="#"
                                                                   className='text-decoration-none text-dark'>{o.course?.title}</a>
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <h5 className="text-success mb-0">${o.course.price}</h5>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Link to={`/cart/`} className='btn btn-outline-secondary mt-3'>Edit Cart <i className='fas fa-edit'></i></Link>
                            </div>
                            <div className="shadow p-4 rounded-3 mt-5">
                                <h5 className="mb-0">Personal Details</h5>
                                <form className="row g-3 mt-0">
                                    <div className="col-md-12 bg-light-input">
                                        <label htmlFor="yourName" className="form-label">
                                            Your name *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            id="yourName"
                                            placeholder="Name"
                                            readOnly
                                            value={order.full_name}
                                        />
                                    </div>
                                    <div className="col-md-6 bg-light-input">
                                        <label htmlFor="emailInput" className="form-label">
                                            Email address *
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control bg-light"
                                            id="emailInput"
                                            placeholder="Email"
                                            readOnly
                                            value={order.email}
                                        />
                                    </div>
                                    <div className="col-md-12 bg-light-input">
                                        <label htmlFor="mobileNumber" className="form-label">
                                            Select country *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            id="mobileNumber"
                                            placeholder="Country"
                                            readOnly
                                            value={order.country}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="row mb-0">
                                <div className="col-md-6 col-xl-12">
                                    <div className="shadow p-4 mb-4 rounded-3">
                                        <h4 className="mb-4">Order Summary</h4>
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Transaction ID</span>
                                                <p className="mb-0 h6 fw-light">DES23853</p>
                                            </div>
                                        </div>
                                        <div className="input-group mt-1">
                                            <input
                                                className="form-control form-control"
                                                placeholder="COUPON CODE"
                                                onChange={(e) => setCoupon(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={applyCoupon}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        <div className="p-3 shadow rounded-3 mt-3">
                                            <h4 className="mb-3">Cart Total</h4>
                                            <ul className="list-group mb-3">
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Sub Total
                                                    <span>${order.sub_total}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Discount
                                                    <span>${order.saved}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Tax
                                                    <span>${order.tax_fee}</span>
                                                </li>
                                                <li className="list-group-item d-flex fw-bold justify-content-between align-items-center">
                                                    Total
                                                    <span className='fw-bold'>${order.total}</span>
                                                </li>
                                            </ul>
                                            <div className="d-grid">
                                                <form
                                                    action={`http://localhost:8000/api/v1/payment/stripe-checkout/${order.oid}/`}
                                                    method={'POST'}
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="csrfmiddlewaretoken"
                                                        value={Cookies.get('csrftoken')}
                                                    />
                                                    {paymentLoading === true ?
                                                        <Button
                                                            type={'submit'}
                                                            disabled
                                                            className="btn btn-lg btn-success mt-2 w-100"
                                                        >
                                                            Processing <i className={'fas fa-spinner fa-spin'}></i>
                                                        </Button>
                                                        :
                                                        <Button
                                                            type={'submit'}
                                                            onClick={payWithStripe}
                                                            className="btn btn-lg btn-success mt-2 w-100"
                                                        >
                                                            Pay With Stripe
                                                        </Button>
                                                    }
                                                </form>
                                                <PayPalScriptProvider options={initialOptions}>
                                                    <PayPalButtons className='mt-3'
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            currency_code: "EUR",
                                                                            value: order.total.toString()
                                                                        }
                                                                    }
                                                                ]
                                                            });
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order.capture().then((details) => {
                                                                const name = details.payer.name.given_name;
                                                                const status = details.status;
                                                                const paypal_order_id = data.orderID;

                                                                console.log(status);
                                                                if (status === "COMPLETED") {
                                                                    navigate(`/payment-success/${order.oid}/?paypal_order_id=${paypal_order_id}`);
                                                                }
                                                            });
                                                        }}
                                                        onError={(err) => {
                                                            console.error("PayPal Checkout onError", err);
                                                            alert("An error occurred during the PayPal transaction. Please try again.");
                                                        }}
                                                        onCancel={() => {
                                                            alert("PayPal transaction was cancelled.");
                                                        }}
                                                    />
                                                </PayPalScriptProvider>
                                            </div>
                                            <p className="small mb-0 mt-2 text-center">
                                                By proceeding to payment, you agree to these{" "}<a href="#"> <strong>Terms of Service</strong></a>
                                            </p>
                                        </div>
                                    </div>
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

export default Checkout;
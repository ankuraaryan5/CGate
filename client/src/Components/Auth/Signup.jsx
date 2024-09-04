import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { getUserData } from "../../store/userSlice"; // Assume you have an action to set user data

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [uType, setUType] = useState("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(
      getUserData({
        firstName,
        lastName,
        email,
        phone,
        password,
        uType,
      })
    );

    try {
      await axios.post(
        "http://localhost:4000/api/v1/cgate/sendOtp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("OTP sent to your email. Please verify to complete registration.");
      navigate("/verify");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <MDBContainer className="register-container">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img
                src="../../images/LoginImage.png"
                alt="login form"
                style={{ width: "500px", height: "650px" }}
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <img
                    src={"../../images/logo2.gif"}
                    alt=""
                    style={{ width: "68px", height: "55px" }}
                  />
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  SignUp into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="FirstName"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="LastName"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  placeholder="do not fill if you don't have one"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Phone"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="button-Login"
                  type="submit"
                  onClick={handleSignup}
                >
                  SignUp
                </button>

                <div className="d-flex flex-row justify-content-start">
                  <Link to="/" className="small text-muted me-1">
                    Terms of use.
                  </Link>
                  <Link to="/" className="small text-muted">
                    Privacy policy
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Signup;

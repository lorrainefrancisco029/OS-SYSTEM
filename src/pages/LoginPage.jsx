import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function LoginPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
  try {
    setGoogleLoading(true);
    setError("");

    const result = await signInWithPopup(auth, googleProvider);

    console.log("Google login successful:", result.user);

  } catch (error) {
    console.error("Google login failed:", error);
    setError("Google login failed. Please try again.");
  } finally {
    setGoogleLoading(false);
  }
};

  const showRegister = () => setShowRegisterForm(true);
  const showLogin = () => setShowRegisterForm(false);

  const togglePassword = (inputId, iconId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.classList.toggle("bi-eye", !isPassword);
    icon.classList.toggle("bi-eye-slash", isPassword);
  };
  return (
    <>
  
  <div className="container">
    <div className="row justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-10 col-md-7 col-lg-5">
       
        <div className="card shadow-sm border-secondary" id="loginForm" style={{ display: showRegisterForm ? "none" : "block" }}>
          <div className="card-body p-4 p-md-5">
            
            <div className="text-center mb-3">
              <img alt="Barangay Logo" className="img-fluid" src="/assets/brgylogo512.png" style={{ width: "90px", height: "90px", objectFit: "contain" }}/>
            </div>
            
            <div className="text-center">
              <div className="fw-bold small mb-1">BARANGAY ONLINE SERVICE SYSTEM</div>
              <h1 className="fw-bold fs-2 mb-1">Welcome Back!</h1>
              <p className="text-secondary mb-4">Login to your account</p>
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="loginEmail">Email Address</label>
              <input className="form-control" id="loginEmail" placeholder="Enter your email" type="email"/>
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="loginPassword">Password</label>
              <div className="input-group">
                <input className="form-control" id="loginPassword" placeholder="Enter your password" type="password"/>
                <button className="btn btn-outline-secondary" onClick={() => togglePassword("loginPassword", "loginEye")} type="button">
                  <i className="bi bi-eye" id="loginEye"></i>
                </button>
              </div>
            </div>
            
            <a className="btn btn-dark w-100 py-2 fw-bold" href="/user-dashboard">
              LOGIN
                </a>

              <div className="text-center my-3">
            <span className="text-secondary small">OR</span>
            </div>

                  <button
                type="button"
          className="btn btn-outline-dark w-100 py-2 fw-bold"
                  onClick={handleGoogleLogin}
              disabled={googleLoading}
>
              <i className="bi bi-google me-2"></i>
              {googleLoading ? "Signing in..." : "Continue with Google"}
                </button>

                {error && (
             <div className="alert alert-danger mt-3 small" role="alert">
                  {error}
             </div>
              )}


<p className="text-center small mt-4 mb-0">
              Don't Have an account?
              <a className="text-dark fw-bold text-decoration-none" href="#" onClick={(event) => { event.preventDefault(); showRegister(); }}>Register here</a>
            </p>
          </div>
        </div>
        
        <div className="card shadow-sm border-secondary" id="registerForm" style={{ display: showRegisterForm ? "block" : "none" }}>
          <div className="card-body p-4 p-md-5">
            
            <div className="text-center mb-3">
              <img alt="Barangay Logo" className="img-fluid" src="/assets/brgylogo512.png" style={{ width: "90px", height: "90px", objectFit: "contain" }}/>
            </div>
            
            <div className="text-center">
              <h1 className="fw-bold fs-2 mb-1">Create an Account</h1>
              <p className="text-secondary mb-4">Register to get started</p>
            </div>
           
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="fullName">Full Name</label>
              <input className="form-control" id="fullName" placeholder="Enter full name" type="text"/>
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="registerEmail">Email Address</label>
              <input className="form-control" id="registerEmail" placeholder="Enter email" type="email"/>
            </div>
           
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="registerPassword">Password</label>
              <div className="input-group">
                <input className="form-control" id="registerPassword" placeholder="Create password" type="password"/>
                <button className="btn btn-outline-secondary" onClick={() => togglePassword("registerPassword", "registerEye")} type="button">
                  <i className="bi bi-eye" id="registerEye"></i>
                </button>
              </div>
            </div>
           
            <div className="mb-4">
              <label className="form-label fw-bold small" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <input className="form-control" id="confirmPassword" placeholder="Confirm password" type="password"/>
                <button className="btn btn-outline-secondary" onClick={() => togglePassword("confirmPassword", "confirmEye")} type="button">
                  <i className="bi bi-eye" id="confirmEye"></i>
                </button>
              </div>
            </div>
            
            <button className="btn btn-dark w-100 py-2 fw-bold" type="button">REGISTER</button>
            
            <p className="text-center small mt-4 mb-0">
              Already have an account?
              <a className="text-dark fw-bold text-decoration-none" href="#" onClick={(event) => { event.preventDefault(); showLogin(); }}>Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
    </>
  );
}

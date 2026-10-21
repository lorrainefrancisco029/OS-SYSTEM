import React from "react";

export default function AdminPage() {
  const toggleAdminPassword = () => {
    const password = document.getElementById("adminPassword");
    const eye = document.getElementById("adminEye");
    if (!password || !eye) return;

    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    eye.classList.toggle("bi-eye", !isPassword);
    eye.classList.toggle("bi-eye-slash", isPassword);
  };


  return (
    <>
  <div className="container">
    <div className="row min-vh-100 align-items-center justify-content-center">
      <div className="col-12 col-sm-10 col-md-7 col-lg-5">
       
        <div className="card admin-card mx-auto shadow-sm border-secondary">
          <div className="card-body p-4 p-md-5">
           
            <div className="text-center mb-3">
              <img alt="Barangay Logo" className="admin-logo img-fluid" src="/assets/brgylogo512.png"/>
            </div>
            
            <div className="text-center mb-4">
              <h5 className="fw-bold mb-2">BARANGAY ONLINE SERVICE SYSTEM</h5>
              <h2 className="fw-bold">Admin Login</h2>
              <p className="text-secondary mb-0">Login to access the administrator dashboard</p>
            </div>
           
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="adminEmail">Admin Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-lock"></i>
                </span>
                <input className="form-control" id="adminEmail" placeholder="Enter admin email" type="email"/>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold small" htmlFor="adminPassword">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input className="form-control" id="adminPassword" placeholder="Enter admin password" type="password"/>
                <button className="btn btn-outline-secondary" onClick={toggleAdminPassword} type="button">
                  <i className="bi bi-eye" id="adminEye"></i>
                </button>
              </div>
            </div>
            
            <div className="form-check mb-4">
              <input className="form-check-input" id="rememberAdmin" type="checkbox"/>
              <label className="form-check-label small" htmlFor="rememberAdmin">Remmember me</label>
            </div>
            
            <a className="btn btn-dark w-100 py-2 fw-bold" href="/admin-dashboard">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              ADMIN LOGIN
            </a>
        
            <a className="btn btn-outline-dark w-100 py-2 fw-bold mt-3" href="/">
             <i className="bi bi-arrow-left me-1"></i>
               CANCEL
              </a>
            
            
            <hr className="my-4"/>
            <p className="text-center text-secondary small mb-0">Authorized personnel only.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
 
    </>
  );
}

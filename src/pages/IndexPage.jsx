import React from "react";

export default function IndexPage() {

  return (
    <>
 
  <nav className="navbar navbar-expand-lg main-navbar py-3">
    <div className="container-fluid px-4">
      {/* LOGO */}
      <a className="navbar-brand d-flex align-items-center gap-3" href="#">
        <div className="logo-box">
          <img alt="Barangay Logo" className="w-100 h-100" src="/assets/brgylogo512.png" style={{ objectFit: "fill" }}/>
        </div>
        <div>
          <div className="fw-bold fs-4">BARANGAY OS</div>
          <div className="small">Barangay Online Service System</div>
        </div>
      </a>
      {/* MOBILE MENU */}
      <button className="navbar-toggler" data-bs-target="#navbarMenu" data-bs-toggle="collapse" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* NAVIGATION */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarMenu">
        <ul className="navbar-nav align-items-lg-center gap-lg-4">
          <li className="nav-item">
            <a className="nav-link text-dark" href="#">HOME</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#about">ABOUT</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#services">SERVICES</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#announcements">ANNOUNCEMENTS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#contact">CONTACT</a>
          </li>
          <li className="nav-item">
            <a className="btn btn-wire" href="/login">LOGIN / REGISTER</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <section className="hero py-5">
    <div className="container-fluid px-4">
      <div className="row align-items-center g-5">
        {/* LEFT SIDE */}
        <div className="col-lg-5">
          <h1 className="hero-title mb-4">
            BARANGAY ONLINE
            <br/>
            SERVICE SYSTEM
          </h1>
          <p className="hero-text mb-4">Your convenient way to request documents
                    and access barangay services online.</p>
          <div className="d-flex gap-3 flex-wrap">
            <a className="btn btn-dark-wire" href="#services">REQUEST DOCUMENT</a>
            <a className="btn btn-wire" href="#services">VIEW SERVICES</a>
          </div>
        </div>
        {/* RIGHT SIDE */}
        {/* YOUR UPLOADED BARANGAY HALL IMAGE */}
        <div className="col-lg-7">
          <img alt="Barangay Hall" className="barangay-hall-image" src="/assets/barangay-hall.png"/>
        </div>
      </div>
    </div>
  </section>
  <section className="py-5" id="services">
    <div className="container-fluid px-4">
      <h2 className="section-title">OUR SERVICES</h2>
      <div className="row g-3">
        {/* SERVICE 1 */}
        <div className="col-12 col-md-6 col-lg">
          <div className="service-card">
            <div className="service-icon">
              <i className="bi bi-file-earmark"></i>
            </div>
            <h5>Barangay Clearance</h5>
            <p>Request and obtain your
                        barangay clearance online.</p>
          </div>
        </div>
        {/* SERVICE 2 */}
        <div className="col-12 col-md-6 col-lg">
          <div className="service-card">
            <div className="service-icon">
              <i className="bi bi-file-text"></i>
            </div>
            <h5>Certificate of Indigency</h5>
            <p>Request for a Certificate
                        of Indigency.</p>
          </div>
        </div>
        {/* SERVICE 3 */}
        <div className="col-12 col-md-6 col-lg">
          <div className="service-card">
            <div className="service-icon">
              <i className="bi bi-file-earmark-check"></i>
            </div>
            <h5>Business Clearance</h5>
            <p>Request for a Business
                        Clearance.</p>
          </div>
        </div>
        {/* SERVICE 4 */}
        <div className="col-12 col-md-6 col-lg">
          <div className="service-card">
            <div className="service-icon">
              <i className="bi bi-house"></i>
            </div>
            <h5>Certificate of Residency</h5>
            <p>Request a certificate
                        of residency.</p>
          </div>
        </div>
        {/* SERVICE 5 */}
        <div className="col-12 col-md-6 col-lg">
          <div className="service-card">
            <div className="service-icon">
              <i className="bi bi-three-dots"></i>
            </div>
            <h5>Others</h5>
            <p>Other barangay related
                        services.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="how-section py-5">
    <div className="container">
      <h2 className="section-title">HOW IT WORKS</h2>
      <div className="position-relative">
        <div className="step-line"></div>
        <div className="row g-4">
          {/* STEP 1 */}
          <div className="col-12 col-md-3 text-center step-content">
            <div className="step-icon bg-white">
              <i className="bi bi-person"></i>
            </div>
            <h6 className="fw-bold mt-3">1. REGISTER / LOGIN</h6>
            <p className="small">Create an account or login
                        to get started.</p>
          </div>
          {/* STEP 2 */}
          <div className="col-12 col-md-3 text-center step-content">
            <div className="step-icon bg-white">
              <i className="bi bi-file-text"></i>
            </div>
            <h6 className="fw-bold mt-3">2. CHOOSE SERVICE</h6>
            <p className="small">Select the service you
                        need and fill out the form.</p>
          </div>
          {/* STEP 3 */}
          <div className="col-12 col-md-3 text-center step-content">
            <div className="step-icon bg-white">
              <i className="bi bi-upload"></i>
            </div>
            <h6 className="fw-bold mt-3">3. SUBMIT REQUEST</h6>
            <p className="small">Submit your request and
                        wait for confirmation.</p>
          </div>
          {/* STEP 4 */}
          <div className="col-12 col-md-3 text-center step-content">
            <div className="step-icon bg-white">
              <i className="bi bi-check-circle"></i>
            </div>
            <h6 className="fw-bold mt-3">4. RECEIVE DOCUMENT</h6>
            <p className="small">Get notified when your
                        document is ready.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="py-5">
    <div className="container-fluid px-4">
      <div className="row g-5">
        {/* ANNOUNCEMENTS */}
        <div className="col-lg-6" id="announcements">
          <h2 className="h4 fw-bold mb-4">ANNOUNCEMENTS</h2>
          {/* ANNOUNCEMENT 1 */}
          <div className="announcement-item">
            <div className="announcement-image">
              <i className="bi bi-bell-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-1">Change in Office Hours</h6>
              <p className="small mb-1">Please be informed that starting May 1,
                            2026, our new office hours will be from
                            8:00 AM to 5:00 PM.</p>
              <small className="text-secondary">April 28, 2026</small>
            </div>
          </div>
          {/* ANNOUNCEMENT 2 */}
          <div className="announcement-item">
            <div className="announcement-image">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-1">Community Clean-Up Drive</h6>
              <p className="small mb-1">Join us this May 12, 2026 for our monthly
                            community clean-up drive.</p>
              <small className="text-secondary">April 25, 2026</small>
            </div>
          </div>
          {/* ANNOUNCEMENT 3 */}
          <div className="announcement-item">
            <div className="announcement-image">
              <i className="bi bi-alarm-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-1">Reminder: Business Clearance Renewal</h6>
              <p className="small mb-1">Business owners are reminded to renew
                            their business clearance on or before
                            May 31, 2026.</p>
              <small className="text-secondary">April 20, 2026</small>
            </div>
          </div>
          <a className="btn btn-wire mt-2" href="#">VIEW ALL ANNOUNCEMENTS</a>
        </div>
        {/* ABOUT */}
        <div className="col-lg-6" id="about">
          <h2 className="h4 fw-bold mb-4">ABOUT OUR BARANGAY</h2>
          <img alt="Barangay Hall" className="about-image mb-3" src="/assets/barangay-hall.png"/>
          <p>Our barangay is committed to providing efficient,
                    transparent, and accessible services to all residents.
                    This online system is designed to make transactions
                    easier and faster for everyone.</p>
          <a className="btn btn-wire" href="#">LEARN MORE</a>
        </div>
      </div>
    </div>
  </section>
  <footer id="contact">
    <div className="container-fluid px-4 py-4">
      <div className="row g-4">
        {/* BARANGAY */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="d-flex gap-3">
            <div className="logo-box">
              <img alt="Barangay Logo" className="w-70 h-100" src="/assets/brgylogo512.png" style={{ objectFit: "fill" }}/>
            </div>
            <div>
              <h5 className="fw-bold">BARANGAY OS</h5>
              <p className="small mb-0">Barangay Online Service System</p>
              <p className="small mt-2">Providing efficient and accessible
                            services for a better community.</p>
            </div>
          </div>
          <div className="mt-3">
            <a className="social-icon" href="#">
              <i className="bi bi-facebook"></i>
            </a>
            <a className="social-icon" href="#">
              <i className="bi bi-messenger"></i>
            </a>
            <a className="social-icon" href="#">
              <i className="bi bi-envelope"></i>
            </a>
          </div>
        </div>
        {/* QUICK LINKS */}
        <div className="col-6 col-md-3 col-lg-2">
          <h6 className="fw-bold">QUICK LINKS</h6>
          <ul className="list-unstyled small">
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#">Home</a>
            </li>
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#about">About</a>
            </li>
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#services">Services</a>
            </li>
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#announcements">Announcements</a>
            </li>
            <li>
              <a className="text-dark text-decoration-none" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        {/* CONTACT */}
        <div className="col-6 col-md-3 col-lg-3">
          <h6 className="fw-bold">CONTACT US</h6>
          <p className="small mb-2">
            <i className="bi bi-geo-alt me-2"></i>
            St Baroc, Villa Celestial
            <br/>
           
                    Oriental Mindoro
          </p>
          <p className="small mb-2">
            <i className="bi bi-telephone me-2"></i>
            (09770347241)
          </p>
          <p className="small mb-2">
            <i className="bi bi-envelope me-2"></i>
            info@barangay.gov.ph
          </p>
          <p className="small">
            <i className="bi bi-clock me-2"></i>
            Mon - Fri: 8:00 AM - 5:00 PM
          </p>
        </div>
        {/* SUPPORT */}
        <div className="col-6 col-md-3 col-lg-2">
          <h6 className="fw-bold">SUPPORT</h6>
          <ul className="list-unstyled small">
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#">FAQ</a>
            </li>
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#">User Guide</a>
            </li>
            <li className="mb-2">
              <a className="text-dark text-decoration-none" href="#">Privacy Policy</a>
            </li>
            <li>
              <a className="text-dark text-decoration-none" href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* COPYRIGHT */}
    <div className="footer-bottom py-3 text-center">
      <small>© 2026 Barangay OS. All rights reserved.</small>
    </div>
  </footer>
    </>
  );
}

import React from "react";

export default function OfflinePage() {

  return (
    <>
  <div className="container">
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        {/* Barangay Logo */}
        <img alt="Barangay Logo" className="mb-4" src="/assets/brgylogo512.png" width="120"/>
        <h1 className="fw-bold">You Are Offline</h1>
        <p className="text-muted">The Barangay Online Service System
                    cannot connect to the internet.</p>
        <div className="alert alert-warning">
          <i className="bi bi-wifi-off"></i>
          Please check your internet connection.
        </div>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise"></i>
          Try Again
        </button>
        <br/>
        <br/>
        <a className="btn btn-outline-secondary" href="/">
          <i className="bi bi-house"></i>
          Go to Home
        </a>
      </div>
    </div>
  </div>
    </>
  );
}

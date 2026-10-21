import React, { useState } from "react";

export default function RequestdetailadminPage({ onBack }) {
  const [request, setRequest] = useState(() => {
    const saved = localStorage.getItem("adminSelectedRequest");
    return saved ? JSON.parse(saved) : null;
  });
  const [status, setStatus] = useState(() => request?.status || "Pending");
  const [remarks, setRemarks] = useState(() => request?.remarks || "");
  const updateStatus = () => {
    if (!request) return;
    const updatedRequest = { ...request, status, remarks };
    setRequest(updatedRequest);
    localStorage.setItem("adminSelectedRequest", JSON.stringify(updatedRequest));
    alert("Request status updated successfully!");
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/manage-request-admin";
    }
  };
  return (
    <>
  <div className="page-container p-4 p-md-5">
    {/* BREADCRUMB */}
    <div className="mb-4">
      <small className="text-secondary">
        Requests
        <span className="mx-2">/</span>
        Manage Requests
        <span className="mx-2">/</span>
        <strong id="breadcrumbId">{request?.id}</strong>
      </small>
    </div>
    <div className="main-card p-4">
      {/* TITLE */}
      <h3 className="fw-bold page-title mb-4">Request Details</h3>
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-lg-7">
          <div className="details-card p-4">
            {/* REQUEST ID */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Request ID</div>
              <div className="col-sm-7" id="requestId">{request?.id}</div>
            </div>
            {/* SERVICE */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Service</div>
              <div className="col-sm-7" id="service">{request?.service}</div>
            </div>
            {/* RESIDENT */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Resident</div>
              <div className="col-sm-7" id="resident">{request?.resident}</div>
            </div>
            {/* DATE */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Date Requested</div>
              <div className="col-sm-7" id="date">{request?.date}</div>
            </div>
            {/* PURPOSE */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Purpose</div>
              <div className="col-sm-7" id="purpose">Employment</div>
            </div>
            {/* CONTACT */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Contact Number</div>
              <div className="col-sm-7" id="contact">0912 345 6789</div>
            </div>
            {/* STATUS */}
            <div className="row details-row align-items-center">
              <div className="col-sm-5 details-label">Status</div>
              <div className="col-sm-7">
                <select className="form-select" id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Process">In Process</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>
            {/* REMARKS */}
            <div className="row details-row">
              <div className="col-sm-5 details-label">Remarks (Admin)</div>
              <div className="col-sm-7">
                <textarea className="form-control remarks" id="remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Enter remarks..."></textarea>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="col-lg-5">
          <div className="details-card p-4 h-100">
            <h5 className="fw-bold mb-3">Request Information</h5>
            <p className="text-secondary">Review the request information
                        before updating its status.</p>
            <div className="alert alert-light border">
              <strong>Admin Note</strong>
              <p className="small mb-0 mt-2">Make sure the resident's
                            request information is
                            complete before marking
                            the request as completed.</p>
            </div>
            <div className="mt-4">
              <label className="form-label fw-semibold">Appointment Date</label>
              <input className="form-control" id="appointmentDate" type="date"/>
            </div>
            <div className="mt-3">
              <label className="form-label fw-semibold">Appointment Time</label>
              <input className="form-control" id="appointmentTime" type="time"/>
            </div>
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" type="button" onClick={() => onBack ? onBack() : (window.location.href = "/admin-dashboard")}>CANCEL</button>
        <button className="btn update-btn px-4" onClick={updateStatus}>UPDATE STATUS</button>
      </div>
    </div>
  </div>
    </>
  );
}

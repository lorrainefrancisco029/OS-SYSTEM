
import React, { useState } from "react";

export default function RequestdetailadminPage({ onBack }) {
  const [request, setRequest] = useState(() => {
    try {
      const saved = localStorage.getItem("adminSelectedRequest");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [status, setStatus] = useState(
    () => request?.status || "Pending"
  );

  const [remarks, setRemarks] = useState(
    () => request?.remarks || ""
  );

  const [appointmentDate, setAppointmentDate] = useState(
    () => request?.appointmentDate || ""
  );

  const [appointmentTime, setAppointmentTime] = useState(
    () => request?.appointmentTime || ""
  );

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const requestId = request?.requestId ?? request?.id;

  const updateStatus = () => {
    if (!request) {
      setMessage("No request was selected. Please return to Manage Requests.");
      setMessageType("danger");
      return;
    }

    // Update only the selected request's details.
    const updatedRequest = {
      ...request,
      status,
      remarks,
      appointmentDate,
      appointmentTime,
    };

    try {
      // Save the selected request for this browser.
      localStorage.setItem(
        "adminSelectedRequest",
        JSON.stringify(updatedRequest)
      );

      // Update the locally stored request list, if available.
      const savedRequests = localStorage.getItem("osSystemRequests");

      if (savedRequests) {
        const requests = JSON.parse(savedRequests);

        if (Array.isArray(requests)) {
          const updatedRequests = requests.map((item) => {
            const itemId = item.requestId ?? item.id;

            return String(itemId) === String(requestId)
              ? { ...item, ...updatedRequest }
              : item;
          });

          localStorage.setItem(
            "osSystemRequests",
            JSON.stringify(updatedRequests)
          );
        }
      }

      setRequest(updatedRequest);
      setMessage("Request details saved in this browser.");
      setMessageType("success");
    } catch (error) {
      console.error("Unable to save request details:", error);
      setMessage("Unable to save changes in this browser.");
      setMessageType("danger");
    }
  };

  const goBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/manage-request-admin";
    }
  };

  if (!request) {
    return (
      <div className="page-container p-4 p-md-5">
        <div className="alert alert-warning">
          No request was selected. Please return to Manage Requests
          and select a request.
        </div>

        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={goBack}
        >
          BACK TO REQUESTS
        </button>
      </div>
    );
  }

  return (
    <div className="page-container p-4 p-md-5">
      {/* BREADCRUMB */}
      <div className="mb-4">
        <small className="text-secondary">
          Requests
          <span className="mx-2">/</span>
          Manage Requests
          <span className="mx-2">/</span>
          <strong>{requestId}</strong>
        </small>
      </div>

      <div className="main-card p-4">
        <h3 className="fw-bold page-title mb-4">
          Request Details
        </h3>

        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-7">
            <div className="details-card p-4">
              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Request ID
                </div>
                <div className="col-sm-7">
                  {requestId || "N/A"}
                </div>
              </div>

              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Service
                </div>
                <div className="col-sm-7">
                  {request.service || "N/A"}
                </div>
              </div>

              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Resident
                </div>
                <div className="col-sm-7">
                  {request.resident ||
                    request.fullName ||
                    "N/A"}
                </div>
              </div>

              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Date Requested
                </div>
                <div className="col-sm-7">
                  {request.date ||
                    request.createdAt ||
                    "N/A"}
                </div>
              </div>

              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Purpose
                </div>
                <div className="col-sm-7">
                  {request.purpose || "N/A"}
                </div>
              </div>

              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Contact Number
                </div>
                <div className="col-sm-7">
                  {request.contactNumber || "N/A"}
                </div>
              </div>

              {/* STATUS */}
              <div className="row details-row align-items-center">
                <div className="col-sm-5 details-label">
                  Status
                </div>
                <div className="col-sm-7">
                  <select
                    className="form-select"
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Process">In Process</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>

              {/* ADMIN REMARKS */}
              <div className="row details-row">
                <div className="col-sm-5 details-label">
                  Remarks (Admin)
                </div>
                <div className="col-sm-7">
                  <textarea
                    className="form-control remarks"
                    value={remarks}
                    onChange={(event) =>
                      setRemarks(event.target.value)
                    }
                    placeholder="Enter remarks..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-5">
            <div className="details-card p-4 h-100">
              <h5 className="fw-bold mb-3">
                Request Information
              </h5>

              <p className="text-secondary">
                Review the request information before updating
                its status.
              </p>

              <div className="alert alert-light border">
                <strong>Admin Note</strong>
                <p className="small mb-0 mt-2">
                  Make sure the resident's request information
                  is complete before marking the request as
                  completed.
                </p>
              </div>

              {/* APPOINTMENT DATE */}
              <div className="mt-4">
                <label
                  className="form-label fw-semibold"
                  htmlFor="appointmentDate"
                >
                  Appointment Date
                </label>

                <input
                  className="form-control"
                  id="appointmentDate"
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={appointmentDate}
                  onChange={(event) =>
                    setAppointmentDate(event.target.value)
                  }
                />
              </div>

              {/* APPOINTMENT TIME */}
              <div className="mt-3">
                <label
                  className="form-label fw-semibold"
                  htmlFor="appointmentTime"
                >
                  Appointment Time
                </label>

                <input
                  className="form-control"
                  id="appointmentTime"
                  type="time"
                  value={appointmentTime}
                  onChange={(event) =>
                    setAppointmentTime(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESULT MESSAGE */}
        {message && (
          <div
            className={`alert alert-${messageType} mt-4`}
            role="status"
          >
            {message}
          </div>
        )}

        {/* BUTTONS */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={goBack}
          >
            CANCEL
          </button>

          <button
            className="btn update-btn px-4"
            type="button"
            onClick={updateStatus}
          >
            UPDATE STATUS
          </button>
        </div>
      </div>
    </div>
  );
}

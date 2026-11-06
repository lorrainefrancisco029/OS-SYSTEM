import React, { useEffect, useState } from "react";

export default function MyrequestPage({ onBack }) {
  const [currentFilter, setCurrentFilter] = useState("All");
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/requests")
      .then((response) => response.json())
      .then((data) => {
        setAllRequests(data);
      })
      .catch((error) => {
        console.log("Error fetching requests:", error);
      });
  }, []);

  const filteredRequests =
    currentFilter === "All"
      ? allRequests
      : allRequests.filter((request) => request.status === currentFilter);

  const viewRequest = (requestId) => {
    const request = allRequests.find((r) => r.requestId === requestId);
    if (!request) return;

    alert(
      `Request ID: ${request.requestId}\nService: ${request.service}\nName: ${request.fullName}\nDate Requested: ${request.dateRequested}\nAppointment: ${request.appointmentDate || ""} ${request.appointmentTime || ""}\nStatus: ${request.status}`
    );
  };

  return (
    <>
      <div className="page-container p-4 p-md-5">
        <div className="mb-4">
          <small className="text-secondary">
            Dashboard
            <span className="mx-2">/</span>
            <strong>My Requests</strong>
          </small>
        </div>

        <h3 className="fw-bold mb-4">My Requests</h3>

        <div className="mb-3">
          <button className={`btn filter-btn ${currentFilter === "All" ? "active" : ""}`} onClick={() => setCurrentFilter("All")}>All</button>
          <button className={`btn filter-btn ${currentFilter === "Pending" ? "active" : ""}`} onClick={() => setCurrentFilter("Pending")}>Pending</button>
          <button className={`btn filter-btn ${currentFilter === "In Process" ? "active" : ""}`} onClick={() => setCurrentFilter("In Process")}>In Process</button>
          <button className={`btn filter-btn ${currentFilter === "Completed" ? "active" : ""}`} onClick={() => setCurrentFilter("Completed")}>Completed</button>
          <button className={`btn filter-btn ${currentFilter === "Canceled" ? "active" : ""}`} onClick={() => setCurrentFilter("Canceled")}>Canceled</button>
        </div>

        <div className="requests-card overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-3">Request ID</th>
                  <th>Service</th>
                  <th>Date Requested</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="requestTable">
                {filteredRequests.map((request) => {
                  const statusClass =
                    request.status === "In Process"
                      ? "process"
                      : request.status === "Completed"
                        ? "completed"
                        : request.status === "Canceled"
                          ? "canceled"
                          : "pending";

                  return (
                    <tr key={request.requestId}>
                      <td className="px-3 fw-semibold">{request.requestId}</td>
                      <td>{request.service}</td>
                      <td>{request.dateRequested}</td>
                      <td>
                        <span className={`status ${statusClass}`}>{request.status}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          type="button"
                          onClick={() => viewRequest(request.requestId)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center text-secondary p-5">
              No requests found.
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-secondary" type="button" onClick={() => onBack ? onBack() : (window.location.href = "/user-dashboard")}>BACK</button>
          <button className="btn btn-dark px-4" type="button" onClick={() => onBack ? onBack() : (window.location.href = "/user-dashboard")}>DONE</button>
        </div>
      </div>
    </>
  );
}

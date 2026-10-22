
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerequestadminPage() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editRequestId, setEditRequestId] = useState("");
  const [editService, setEditService] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editDateRequested, setEditDateRequested] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load requests from the backend.
  useEffect(() => {
    fetch("https://os-system-ubjr.onrender.com/api/requests")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load requests");
        }
        return response.json();
      })
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  // Open the existing View Requests page.
  function openRequestDetails(request) {
    const selectedRequest = {
      ...request,
      id: request.requestId ?? request.id,
      requestId: request.requestId ?? request.id,
      resident: request.fullName ?? request.resident ?? "",
      date: request.dateRequested ?? request.date ?? "",
      purpose: request.purpose ?? "",
      contactNumber: request.contactNumber ?? "",
      status: request.status ?? "Pending",
      remarks: request.remarks ?? "",
      appointmentDate: request.appointmentDate ?? "",
      appointmentTime: request.appointmentTime ?? "",
    };

    localStorage.setItem(
      "adminSelectedRequest",
      JSON.stringify(selectedRequest)
    );

    navigate("/my-request");
  }

  // Search and filter requests.
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.resident
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.service
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(request.requestId ?? request.id ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Open the existing Edit modal.
  function openEditModal(request) {
    setEditRequestId(request.requestId ?? request.id);
    setEditService(request.service ?? "");
    setEditFullName(request.fullName ?? request.resident ?? "");
    setEditDateRequested(
      request.dateRequested ?? request.date ?? ""
    );
    setEditStatus(request.status ?? "Pending");
    setIsModalOpen(true);
  }

  // Save edits to the backend.
  async function handleUpdate(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://os-system-ubjr.onrender.com/api/requests/${editRequestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: editService,
            fullName: editFullName,
            dateRequested: editDateRequested,
            status: editStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      const data = await response.json();

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          String(request.requestId ?? request.id) ===
          String(editRequestId)
            ? data
            : request
        )
      );

      setIsModalOpen(false);
      alert("Request updated successfully!");
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Unable to update the request. Please try again.");
    }
  }

  // Delete only the selected request.
  async function handleDelete(requestId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://os-system-ubjr.onrender.com/api/requests/${requestId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      setRequests((previousRequests) =>
        previousRequests.filter(
          (request) =>
            String(request.requestId ?? request.id) !==
            String(requestId)
        )
      );

      alert("Request deleted successfully!");
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Unable to delete the request. Please try again.");
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Manage Requests</h2>
          <p className="text-muted mb-0">
            View and manage barangay service requests
          </p>
        </div>
      </div>

      {/* SEARCH AND STATUS FILTER */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="In Process">In Process</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* REQUESTS TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Resident</th>
                  <th>Service</th>
                  <th>Date Requested</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => {
                  const requestId =
                    request.requestId ?? request.id;

                  return (
                    <tr key={requestId}>
                      <td>{requestId}</td>
                      <td>
                        {request.fullName ??
                          request.resident ??
                          "N/A"}
                      </td>
                      <td>{request.service ?? "N/A"}</td>
                      <td>
                        {request.dateRequested ??
                          request.date ??
                          "N/A"}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {request.status ?? "Pending"}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() =>
                            openRequestDetails(request)
                          }
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => openEditModal(request)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(requestId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EDIT REQUEST MODAL */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Request</h5>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label
                      htmlFor="editRequestId"
                      className="form-label"
                    >
                      Request ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editRequestId"
                      value={editRequestId}
                      readOnly
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="editFullName"
                      className="form-label"
                    >
                      Resident
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editFullName"
                      value={editFullName}
                      onChange={(event) =>
                        setEditFullName(event.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="editService"
                      className="form-label"
                    >
                      Service
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editService"
                      value={editService}
                      onChange={(event) =>
                        setEditService(event.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="editDateRequested"
                      className="form-label"
                    >
                      Date Requested
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDateRequested"
                      value={editDateRequested}
                      onChange={(event) =>
                        setEditDateRequested(event.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="editStatus"
                      className="form-label"
                    >
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="editStatus"
                      value={editStatus}
                      onChange={(event) =>
                        setEditStatus(event.target.value)
                      }
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="In Process">In Process</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

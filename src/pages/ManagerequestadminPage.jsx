import React, { useState, useEffect } from "react";

export default function ManagerequestadminPage() {
  const [requests, setRequests] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editRequestId, setEditRequestId] = useState("");
  const [editService, setEditService] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editDateRequested, setEditDateRequested] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://os-system-ubjr.onrender.com/api/requests")
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.log("Error fetching requests:", error);
      });
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function openEditModal(request) {
    setIsModalOpen(true);
    setEditRequestId(request.requestId);
    setEditService(request.service);
    setEditFullName(request.fullName);
    setEditDateRequested(request.dateRequested);
    setEditStatus(request.status);
  }

  async function handleUpdate(event) {
    event.preventDefault();

    try {
      const response = await fetch(
       `https://os-system-ubjr.onrender.com/api/requests/${editRequestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            service: editService,
            fullName: editFullName,
            dateRequested: editDateRequested,
            status: editStatus
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      const data = await response.json();

      setRequests((prev) =>
        prev.map((request) =>
          request.requestId === editRequestId ? data : request
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      console.log("Error updating request:", error);
    }
  }

  async function handleDelete(requestId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://os-system-ubjr.onrender.com/api/requests/${requestId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      await response.json();

      setRequests((prev) =>
        prev.filter((request) => request.requestId !== requestId)
      );
    } catch (error) {
      console.log("Error deleting request:", error);
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

      {}
      <div className="row g-3 mb-4">

        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

      </div>


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
                {filteredRequests.map((request) => (
                  <tr key={request.requestId}>
                    <td>{request.requestId}</td>
                    <td>{request.fullName}</td>
                    <td>{request.service}</td>
                    <td>{request.dateRequested}
                    </td>

                    <td>
                      <span className="badge bg-secondary">
                        {request.status}
                      </span>
                    </td>

                    <td>
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
                        onClick={() => handleDelete(request.requestId)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}


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

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Request</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">

                  <div className="mb-3">
                    <label htmlFor="editRequestId" className="form-label">
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
                    <label htmlFor="editFullName" className="form-label">
                      Resident
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editFullName"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editService" className="form-label">
                      Service
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editService"
                      value={editService}
                      onChange={(e) => setEditService(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editDateRequested" className="form-label">
                      Date Requested
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDateRequested"
                      value={editDateRequested}
                      onChange={(e) => setEditDateRequested(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editStatus" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="editStatus"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Process">In Process</option>
                      <option value="Completed">Completed</option>
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

                  <button type="submit" className="btn btn-primary">
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

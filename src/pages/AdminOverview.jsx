
import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://os-system-ubjr.onrender.com";

export default function AdminOverview() {
  const [requests, setRequests] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // EDITOR STATE
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    time: "",
    location: ""
  });

  // GET ANNOUNCEMENTS AND SCHEDULES FROM DATABASE
  const loadContent = async () => {
    try {
      const [announcementResponse, scheduleResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/announcements`),
        fetch(`${API_BASE_URL}/api/schedules`)
      ]);

      if (!announcementResponse.ok || !scheduleResponse.ok) {
        throw new Error("Failed to load announcements or schedules.");
      }

      const announcementData = await announcementResponse.json();
      const scheduleData = await scheduleResponse.json();

      setAnnouncements(
        Array.isArray(announcementData)
          ? announcementData.map((item) => ({
              id: item.id,
              title: item.title,
              message: item.description,
              published: item.date
                ? `Published ${item.date}`
                : ""
            }))
          : []
      );

      setSchedules(
        Array.isArray(scheduleData)
          ? scheduleData.map((item) => ({
              id: item.id,
              activity: item.title,
              time: item.time,
              location: item.location
            }))
          : []
      );
    } catch (error) {
      console.error("Error loading dashboard content:", error);
      alert("Unable to load announcements and schedules.");
    }
  };

  // OPEN ADD / EDIT FORM
  const openEditor = (type, item = null) => {
    setEditorType(type);
    setEditingId(item ? item.id : null);

    if (type === "announcement") {
      setFormData({
        title: item?.title || "",
        message: item?.message || "",
        time: "",
        location: ""
      });
    } else {
      setFormData({
        title: item?.activity || "",
        message: "",
        time: item?.time || "",
        location: item?.location || ""
      });
    }

    setShowEditor(true);
  };

  // SAVE SCHEDULE / ANNOUNCEMENT TO DATABASE
  const saveItem = async (e) => {
    e.preventDefault();

    try {
      const isAnnouncement = editorType === "announcement";

      const endpoint = isAnnouncement
        ? `${API_BASE_URL}/api/announcements`
        : `${API_BASE_URL}/api/schedules`;

      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const data = isAnnouncement
        ? {
            title: formData.title,
            description: formData.message,
            date
          }
        : {
            title: formData.title,
            time: formData.time,
            location: formData.location
          };

      const response = await fetch(
        editingId !== null
          ? `${endpoint}/${editingId}`
          : endpoint,
        {
          method: editingId !== null ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save item.");
      }

      await loadContent();

      setShowEditor(false);
      setEditingId(null);

      alert("Saved successfully!");
    } catch (error) {
      console.error("SAVE ERROR:", error);
      alert(error.message || "Unable to save. Please try again.");
    }
  };

  // DELETE SCHEDULE / ANNOUNCEMENT FROM DATABASE
  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const endpoint =
        type === "announcement" ? "announcements" : "schedules";

      const response = await fetch(
        `${API_BASE_URL}/api/${endpoint}/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete item.");
      }

      await loadContent();

      alert("Deleted successfully!");
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert(error.message || "Unable to delete. Please try again.");
    }
  };

  // GET REQUESTS FROM DATABASE
  useEffect(() => {
    fetch("https://os-system-ubjr.onrender.com/api/requests")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        return response.json();
      })
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching dashboard requests:", error);
      });
  }, []);

  // LOAD ANNOUNCEMENTS AND SCHEDULES
  useEffect(() => {
    loadContent();
  }, []);

  // GET TODAY'S DATE
  const date = new Date();
  const today =
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  // GET DATE ONLY
  const getDateOnly = (value) => {
    if (!value) return "";
    return String(value).slice(0, 10);
  };

  // FORMAT REQUEST DATE
  const formatDate = (value) => {
    const dateOnly = getDateOnly(value);

    if (!dateOnly) return "N/A";

    const [year, month, day] = dateOnly.split("-");

    if (!year || !month || !day) return "N/A";

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // GET LATEST 4 REQUESTS
  const recentRequests = [...requests]
    .sort((a, b) => {
      const dateA = getDateOnly(a.dateRequested || a.date_requested);
      const dateB = getDateOnly(b.dateRequested || b.date_requested);

      return dateB.localeCompare(dateA);
    })
    .slice(0, 4);

  // STATUS BADGE COLOR
  const getStatusClass = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "pending":
        return "bg-warning-subtle text-warning";

      case "in process":
      case "processing":
        return "bg-info-subtle text-info";

      case "approved":
      case "completed":
        return "bg-success-subtle text-success";

      case "canceled":
      case "cancelled":
        return "bg-danger-subtle text-danger";

      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  // DASHBOARD STATISTICS
  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const todayRequests = requests.filter(
    (request) =>
      getDateOnly(request.dateRequested || request.date_requested) === today
  ).length;

  const completedCount = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  const completedPercentage =
    requests.length === 0
      ? 0
      : Math.round((completedCount / requests.length) * 100);

  const scheduledToday = requests.filter(
    (request) =>
      getDateOnly(request.appointmentDate || request.appointment_date) === today
  ).length;

  return (
    <div className="p-4">

      {/* WELCOME CARD - CREATE ANNOUNCEMENT BUTTON REMOVED */}
      <div className="welcome-card p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-12">
            <span className="badge bg-warning text-dark mb-2">
              ADMIN CONTROL CENTER
            </span>
            <h2 className="fw-bold">Good day! Administrator.</h2>
            <p className="mb-0 opacity-75">
              Here's a quick look at what needs your attention today.
            </p>
          </div>
        </div>
      </div>

      {/* DASHBOARD STATISTICS */}
      <div className="row g-3 mb-4">

        <div className="col-sm-6 col-xl-3">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-secondary">NEEDS ATTENTION</small>
                  <div className="stat-number text-warning">{pendingCount}</div>
                  <small>Pending requests</small>
                </div>
                <div className="stat-icon bg-warning-subtle text-warning">
                  <i className="bi bi-hourglass-split"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-secondary">TODAY</small>
                  <div className="stat-number text-success">{todayRequests}</div>
                  <small>Requests received</small>
                </div>
                <div className="stat-icon bg-success-subtle text-success">
                  <i className="bi bi-arrow-down-left"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-secondary">COMPLETED</small>
                  <div className="stat-number text-primary">
                    {completedPercentage}%
                  </div>
                  <small>Requests processed</small>
                </div>
                <div className="stat-icon bg-primary-subtle text-primary">
                  <i className="bi bi-check2-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-secondary">TODAY</small>
                  <div className="stat-number text-danger">{scheduledToday}</div>
                  <small>Scheduled activities</small>
                </div>
                <div className="stat-icon bg-danger-subtle text-danger">
                  <i className="bi bi-calendar-event"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ACTION CENTER */}
      <div className="card dashboard-card p-4 mb-4" id="services">
        <div className="mb-3">
          <h5 className="fw-bold mb-1">Action Center</h5>
          <small className="text-secondary">
            Frequently used administrative tools
          </small>
        </div>

        <div className="row g-3">
          <div className="col-6 col-md-3">
            <a className="action-button" href="#recent-requests">
              <div className="action-icon bg-warning-subtle text-warning">
                <i className="bi bi-inbox-fill"></i>
              </div>
              <div className="fw-bold">Review Requests</div>
              <small className="text-secondary">{pendingCount} waiting</small>
            </a>
          </div>

          <div className="col-6 col-md-3">
            <a className="action-button" href="#">
              <div className="action-icon bg-success-subtle text-success">
                <i className="bi bi-box-seam-fill"></i>
              </div>
              <div className="fw-bold">Manage Services</div>
              <small className="text-secondary">Barangay documents</small>
            </a>
          </div>

          <div className="col-6 col-md-3">
            <a className="action-button" href="#announcements">
              <div className="action-icon bg-primary-subtle text-primary">
                <i className="bi bi-megaphone-fill"></i>
              </div>
              <div className="fw-bold">Post Update</div>
              <small className="text-secondary">Inform residents</small>
            </a>
          </div>

          <div className="col-6 col-md-3">
            <a className="action-button" href="#schedule">
              <div className="action-icon bg-danger-subtle text-danger">
                <i className="bi bi-calendar-plus"></i>
              </div>
              <div className="fw-bold">Schedule Event</div>
              <small className="text-secondary">Add activity</small>
            </a>
          </div>
        </div>
      </div>

      {/* RECENT SERVICE REQUESTS */}
      <div className="card dashboard-card mb-4" id="recent-requests">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">
                <i className="bi bi-clock-history text-success me-2"></i>
                Recent Service Requests
              </h5>
              <small className="text-secondary">
                Latest requests submitted through the online barangay services
              </small>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Request ID</th>
                  <th>Service</th>
                  <th>Requester</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentRequests.length > 0 ? (
                  recentRequests.map((request, index) => (
                    <tr
                      key={
                        request.requestId ||
                        request.request_code ||
                        request.id ||
                        index
                      }
                    >
                      <td>
                        <strong className="text-success">
                          #{request.requestId || request.request_code || request.id || "N/A"}
                        </strong>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="request-icon bg-success-subtle text-success">
                            <i className="bi bi-file-earmark-text"></i>
                          </div>
                          <div>
                            <div className="fw-semibold">
                              {request.service || "N/A"}
                            </div>
                            <small className="text-secondary">
                              Service Request
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {request.fullName ||
                            request.full_name ||
                            request.resident ||
                            "N/A"}
                        </div>
                        <small className="text-secondary">
                          {request.address || "No address provided"}
                        </small>
                      </td>

                      <td>
                        {formatDate(
                          request.dateRequested || request.date_requested
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${getStatusClass(request.status)}`}
                        >
                          {request.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-secondary py-4">
                      No service requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SCHEDULE + ANNOUNCEMENTS */}
      <div className="row g-4 mb-4">

        {/* TODAY'S SCHEDULE */}
        <div className="col-xl-5" id="schedule">
          <div className="card dashboard-card h-100">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-1">Today's Schedule</h5>
                  <small className="text-secondary">Daily activities</small>
                </div>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => openEditor("schedule")}
                >
                  <i className="bi bi-plus-lg me-1"></i>
                  Add
                </button>
              </div>

              {schedules.map((item) => (
                <div className="schedule-item" key={item.id}>
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                      <div className="schedule-time">{item.time}</div>
                      <div className="fw-semibold">{item.activity}</div>
                      <small className="text-secondary">{item.location}</small>
                    </div>

                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openEditor("schedule", item)}
                        title="Edit schedule"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteItem("schedule", item.id)}
                        title="Delete schedule"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {schedules.length === 0 && (
                <p className="text-secondary text-center mt-4">
                  No schedules available.
                </p>
              )}

            </div>
          </div>
        </div>

        {/* LIVE ANNOUNCEMENTS */}
        <div className="col-xl-7" id="announcements">
          <div className="card dashboard-card h-100">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-1">Live Announcements</h5>
                  <small className="text-secondary">
                    Information visible to residents
                  </small>
                </div>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => openEditor("announcement")}
                >
                  <i className="bi bi-plus-lg me-1"></i>
                  Add
                </button>
              </div>

              {announcements.map((item) => (
                <div className="announcement" key={item.id}>
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div className="d-flex gap-3">
                      <i className="bi bi-bell-fill text-warning fs-4 flex-shrink-0"></i>

                      <div>
                        <h6 className="fw-bold mb-1">{item.title}</h6>
                        <p className="small text-secondary mb-1">
                          {item.message}
                        </p>
                        <small className="text-secondary">
                          {item.published}
                        </small>
                      </div>
                    </div>

                    <div className="d-flex gap-1 flex-shrink-0">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openEditor("announcement", item)}
                        title="Edit announcement"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteItem("announcement", item.id)}
                        title="Delete announcement"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {announcements.length === 0 && (
                <p className="text-secondary text-center mt-4">
                  No announcements available.
                </p>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showEditor && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <form onSubmit={saveItem}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingId !== null ? "Edit" : "Add"}{" "}
                    {editorType === "announcement"
                      ? "Announcement"
                      : "Schedule"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditor(false)}
                  ></button>
                </div>

                <div className="modal-body">

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      {editorType === "announcement"
                        ? "Announcement Title"
                        : "Activity Name"}
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  {editorType === "announcement" ? (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Announcement Message
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value
                          })
                        }
                        required
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Activity Time
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Example: 8:00 AM"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              time: e.target.value
                            })
                          }
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Location
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value
                            })
                          }
                          required
                        />
                      </div>
                    </>
                  )}

                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditor(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-lg me-1"></i>
                    Save
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* DAILY SUMMARY */}
      <div className="card dashboard-card mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-1">Daily Summary</h5>
          <small className="text-secondary">Today's system activity</small>

          <div className="row mt-4 g-4">

            <div className="col-md-4">
              <div className="d-flex justify-content-between mb-2">
                <span>Completed requests</span>
                <strong className="text-success">{completedCount}</strong>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${completedPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex justify-content-between mb-2">
                <span>Pending requests</span>
                <strong className="text-warning">{pendingCount}</strong>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-warning"
                  style={{
                    width: `${
                      requests.length === 0
                        ? 0
                        : Math.round((pendingCount / requests.length) * 100)
                    }%`
                  }}
                ></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex justify-content-between mb-2">
                <span>Active announcements</span>
                <strong className="text-primary">{announcements.length}</strong>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-primary"
                  style={{
                    width: `${announcements.length === 0 ? 0 : Math.min(announcements.length * 20, 100)}%`
                  }}
                ></div>
              </div>
            </div>

          </div>

          <div className="alert alert-success mt-4 mb-0">
            <i className="bi bi-check-circle-fill me-2"></i>
            <strong>System operational</strong>
            <br />
            <small>All online services are currently available.</small>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-5 pt-3 pb-4">
        <small className="text-secondary">
          © 2026 Barangay Online Service System
          <span className="mx-2">•</span>
          Administrator Portal
        </small>
      </div>

    </div>
  );
}

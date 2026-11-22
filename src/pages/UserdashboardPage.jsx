
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import UserOverview from "./UserOverview";
import MyrequestPage from "./MyrequestPage";
import RequestservicePage from "./RequestservicePage";

const API_BASE_URL = "https://os-system-ubjr.onrender.com";

function SimpleContent({ title, description, children }) {
  return (
    <div className="dashboard-simple-content p-4 p-md-5">
      <div className="main-card p-4 p-md-5">
        <h3 className="fw-bold mb-2">{title}</h3>
        <p className="text-secondary mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
}

// REQUEST DETAILS
function RequestDetailsContent({ request, onBack }) {
  const formatDate = (date) => {
    if (!date) return "Not provided";

    return new Date(
      `${String(date).slice(0, 10)}T00:00:00`
    ).toLocaleDateString();
  };

  if (!request) {
    return (
      <SimpleContent
        title="Request Details"
        description="The selected request could not be found."
      >
        <button className="btn btn-outline-success" onClick={onBack}>
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </SimpleContent>
    );
  }

  return (
    <SimpleContent
      title="Request Details"
      description="View the information and current status of your service request."
    >
      <div className="card border-0 bg-light mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <small className="text-secondary">REQUEST ID</small>
              <h5 className="fw-bold text-success mb-0">
                #{request.requestId || request.id}
              </h5>
            </div>

            <span
              className={`badge rounded-pill px-3 py-2 ${
                String(request.status || "Pending").toLowerCase() === "completed"
                  ? "bg-success-subtle text-success"
                  : String(request.status || "Pending").toLowerCase() === "pending"
                  ? "bg-warning-subtle text-warning"
                  : "bg-info-subtle text-info"
              }`}
            >
              {request.status || "Pending"}
            </span>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Resident Information</h5>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <small className="text-secondary">Full Name</small>
          <p className="fw-semibold">{request.fullName || "Not provided"}</p>
        </div>

        <div className="col-md-6">
          <small className="text-secondary">Address</small>
          <p className="fw-semibold">{request.address || "Not provided"}</p>
        </div>

        <div className="col-md-6">
          <small className="text-secondary">Contact Number</small>
          <p className="fw-semibold">{request.contactNumber || "Not provided"}</p>
        </div>
      </div>

      <hr />

      <h5 className="fw-bold mb-3">Service Information</h5>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <small className="text-secondary">Service Requested</small>
          <p className="fw-semibold">{request.service || "Not provided"}</p>
        </div>

        <div className="col-md-6">
          <small className="text-secondary">Date Requested</small>
          <p className="fw-semibold">{formatDate(request.dateRequested)}</p>
        </div>

        <div className="col-md-6">
          <small className="text-secondary">Appointment Date</small>
          <p className="fw-semibold">{formatDate(request.appointmentDate)}</p>
        </div>

        <div className="col-md-6">
          <small className="text-secondary">Appointment Time</small>
          <p className="fw-semibold">{request.appointmentTime || "Not provided"}</p>
        </div>

        <div className="col-12">
          <small className="text-secondary">Purpose</small>
          <p className="fw-semibold">{request.purpose || "Not provided"}</p>
        </div>
      </div>

      <hr />

      <h5 className="fw-bold mb-3">Admin Remarks</h5>

      <div className="p-3 rounded bg-light mb-4">
        <p className="mb-0">
          {request.remarks || "No remarks from the administrator yet."}
        </p>
      </div>

      <button
        className="btn btn-outline-success"
        type="button"
        onClick={onBack}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back to Dashboard
      </button>
    </SimpleContent>
  );
}

// ANNOUNCEMENTS FROM DATABASE
function AnnouncementsContent() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadAnnouncements = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/announcements`
        );

        if (!response.ok) {
          throw new Error("Unable to load announcements.");
        }

        const data = await response.json();

        if (!cancelled) {
          setAnnouncements(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading announcements:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadAnnouncements();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SimpleContent
      title="Announcements"
      description="Important information and updates from your Barangay."
    >
      {loading ? (
        <p className="text-secondary">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-secondary">No announcements available.</p>
      ) : (
        announcements.map((item, index) => (
          <div
            className={`announcement ${
              index === announcements.length - 1 ? "mb-0" : "mb-3"
            }`}
            key={item.id || index}
          >
            <div className="d-flex gap-3">
              <i className="bi bi-bell-fill text-warning fs-4"></i>

              <div>
                <h6 className="fw-bold mb-1">{item.title}</h6>

                <p className="small text-secondary mb-1">
                  {item.description || item.message}
                </p>

                <small className="text-secondary">
                  {item.date || item.published_date || ""}
                </small>
              </div>
            </div>
          </div>
        ))
      )}
    </SimpleContent>
  );
}

// SCHEDULE FROM DATABASE
function ScheduleContent() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadSchedules = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/schedules`
        );

        if (!response.ok) {
          throw new Error("Unable to load schedules.");
        }

        const data = await response.json();

        if (!cancelled) {
          setSchedules(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading schedules:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadSchedules();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SimpleContent
      title="Schedule"
      description="Barangay activities and upcoming events."
    >
      {loading ? (
        <p className="text-secondary">Loading schedules...</p>
      ) : schedules.length === 0 ? (
        <p className="text-secondary">
          No upcoming schedules available.
        </p>
      ) : (
        schedules.map((item, index) => (
          <div
            className={`schedule-item ${
              index === schedules.length - 1 ? "mb-0" : "mb-4"
            }`}
            key={item.id || index}
          >
            <div className="schedule-time">
              {item.time || item.activity_time}
            </div>

            <div className="fw-semibold">
              {item.title || item.activity}
            </div>

            <small className="text-secondary">
              {item.location || "Location not specified"}
            </small>
          </div>
        ))
      )}
    </SimpleContent>
  );
}

// PROFILE
function ProfileContent() {
  return (
    <SimpleContent
      title="My Profile"
      description="View and manage your resident account information."
    >
      <div className="profile-box">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div
              className="avatar bg-warning text-dark"
              style={{
                width: "65px",
                height: "65px",
                fontSize: "20px"
              }}
            >
              EF
            </div>

            <div>
              <h5 className="fw-bold mb-1">Eliz Francisco</h5>
              <p className="mb-1 opacity-75">Barangay Resident</p>
              <small className="opacity-75">
                Zone 3 • Account Active
              </small>
            </div>
          </div>
        </div>
      </div>
    </SimpleContent>
  );
}

// RESIDENT DASHBOARD
export default function UserdashboardPage() {
  const [activePage, setActivePage] = useState("overview");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const openRequestDetails = (request) => {
    setSelectedRequest(request);
    setActivePage("request-details");
  };

  const renderContent = () => {
    switch (activePage) {
      case "requests":
        return (
          <MyrequestPage
            onBack={() => setActivePage("overview")}
          />
        );

      case "request-details":
        return (
          <RequestDetailsContent
            request={selectedRequest}
            onBack={() => setActivePage("overview")}
          />
        );

      case "services":
        return (
          <RequestservicePage
            onBack={() => setActivePage("overview")}
            onSubmitted={() => setActivePage("requests")}
          />
        );

      case "announcements":
        return <AnnouncementsContent />;

      case "schedule":
        return <ScheduleContent />;

      case "profile":
        return <ProfileContent />;

      case "overview":
      default:
        return (
          <UserOverview
            onRequestService={() => setActivePage("services")}
            onViewRequests={() => setActivePage("requests")}
            onViewRequest={openRequestDetails}
          />
        );
    }
  };

  return (
    <DashboardLayout
      role="user"
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

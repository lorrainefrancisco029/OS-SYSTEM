import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import UserOverview from "./UserOverview";
import MyrequestPage from "./MyrequestPage";
import RequestservicePage from "./RequestservicePage";

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

function AnnouncementsContent() {
  return (
    <SimpleContent
      title="Announcements"
      description="Important information and updates from your Barangay."
    >
      <div className="announcement mb-3">
        <div className="d-flex gap-3">
          <i className="bi bi-bell-fill text-warning fs-4"></i>
          <div>
            <h6 className="fw-bold mb-1">Change in Office Hours</h6>
            <p className="small text-secondary mb-1">Office hours will be from 8:00 AM to 5:00 PM.</p>
            <small className="text-secondary">April 28, 2026</small>
          </div>
        </div>
      </div>
      <div className="announcement mb-3">
        <div className="d-flex gap-3">
          <i className="bi bi-calendar-check-fill text-success fs-4"></i>
          <div>
            <h6 className="fw-bold mb-1">Community Clean-Up Drive</h6>
            <p className="small text-secondary mb-1">Join the community clean-up drive on May 12, 2026.</p>
            <small className="text-secondary">April 25, 2026</small>
          </div>
        </div>
      </div>
      <div className="announcement mb-0">
        <div className="d-flex gap-3">
          <i className="bi bi-alarm-fill text-danger fs-4"></i>
          <div>
            <h6 className="fw-bold mb-1">Business Clearance Renewal</h6>
            <p className="small text-secondary mb-1">Business owners are reminded to renew their clearance.</p>
            <small className="text-secondary">April 20, 2026</small>
          </div>
        </div>
      </div>
    </SimpleContent>
  );
}

function ScheduleContent() {
  return (
    <SimpleContent
      title="Schedule"
      description="Barangay activities and upcoming events."
    >
      <div className="schedule-item mb-4">
        <div className="schedule-time">May 5, 2026</div>
        <div className="fw-semibold">Barangay Assembly</div>
        <small className="text-secondary">9:00 AM • Barangay Hall</small>
      </div>
      <div className="schedule-item mb-4">
        <div className="schedule-time">May 12, 2026</div>
        <div className="fw-semibold">Community Clean-Up Drive</div>
        <small className="text-secondary">7:00 AM • Barangay Grounds</small>
      </div>
      <div className="schedule-item mb-0">
        <div className="schedule-time">May 20, 2026</div>
        <div className="fw-semibold">Health and Wellness Program</div>
        <small className="text-secondary">8:00 AM • Barangay Hall</small>
      </div>
    </SimpleContent>
  );
}

function ProfileContent() {
  return (
    <SimpleContent
      title="My Profile"
      description="View and manage your resident account information."
    >
      <div className="profile-box">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="avatar bg-warning text-dark" style={{ width: "65px", height: "65px", fontSize: "20px" }}>
              EF
            </div>
            <div>
              <h5 className="fw-bold mb-1">Eliz Francisco</h5>
              <p className="mb-1 opacity-75">Barangay Resident</p>
              <small className="opacity-75">Zone 3 • Account Active</small>
            </div>
          </div>
        </div>
      </div>
    </SimpleContent>
  );
}

export default function UserdashboardPage() {
  const [activePage, setActivePage] = useState("overview");

  const renderContent = () => {
    switch (activePage) {
      case "requests":
        return <MyrequestPage onBack={() => setActivePage("overview")} />;
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
        return <UserOverview onRequestService={() => setActivePage("services")} />;
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

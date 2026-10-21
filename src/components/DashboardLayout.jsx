import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function DashboardLayout({
  role = "user",
  activePage,
  onNavigate,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 767);
  const isAdmin = role === "admin";

  const adminMenu = [
    { id: "overview", label: "Overview", icon: "bi-grid-1x2-fill" },
    { id: "manage-requests", label: "Manage Requests", icon: "bi-inbox-fill" },
    { id: "view-requests", label: "View Requests", icon: "bi-eye-fill" },
    { id: "manage-services", label: "Manage Services", icon: "bi-gear-fill" },
  ];

  const userMenu = [
    { id: "overview", label: "Overview", icon: "bi-grid-1x2-fill" },
    { id: "requests", label: "My Requests", icon: "bi-file-earmark-text-fill" },
    { id: "services", label: "Services", icon: "bi-box-seam-fill" },
    { id: "announcements", label: "Announcements", icon: "bi-megaphone-fill" },
    { id: "schedule", label: "Schedule", icon: "bi-calendar-event-fill" },
    { id: "profile", label: "My Profile", icon: "bi-person-fill" },
  ];

  const menuItems = isAdmin ? adminMenu : userMenu;

  const handleNavigate = (id) => {
    onNavigate(id);
    // On phones, hide the sidebar after choosing a section.
    if (window.innerWidth <= 767) setSidebarOpen(false);
  };

  const logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <div className={`dashboard-container dashboard-${role} ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <aside className="sidebar p-3" aria-label={`${isAdmin ? "Administrator" : "Resident"} navigation`}>
        <div className="text-center mb-4">
          <img
            src="/assets/brgylogo512.png"
            alt="Barangay Logo"
            className="sidebar-logo"
          />
          <h2 className="brand-name mt-3 mb-1">BARANGAY OS</h2>
          <div className="brand-subtitle fs-5">
            {isAdmin ? "Administrator Portal" : "Resident Portal"}
          </div>
        </div>

        <ul className="nav flex-column" id={`${role}SidebarMenu`}>
          {menuItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <button
                type="button"
                className={`nav-link ${activePage === item.id ? "active" : ""}`}
                onClick={() => handleNavigate(item.id)}
              >
                <i className={`bi ${item.icon} nav-icon`} aria-hidden="true"></i>
                <span className="nav-text">{item.label}</span>
                {item.badge && (
                  <span className="badge bg-warning text-dark nav-badge">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}

          <hr className="border-light opacity-25" />

          <li className="nav-item">
            <button type="button" className="nav-link" onClick={logout}>
              <i className="bi bi-box-arrow-left nav-icon" aria-hidden="true"></i>
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </ul>

        <div className="sidebar-status d-none d-lg-block mt-5">
          <div className="bg-white bg-opacity-10 rounded-4 p-3 text-white">
            <small className="text-white-50">
              {isAdmin ? "SYSTEM STATUS" : "ACCOUNT STATUS"}
            </small>
            <div className="mt-2">
              <span
                className="rounded-circle bg-warning d-inline-block me-2"
                style={{ width: "9px", height: "9px" }}
              ></span>
              {isAdmin ? "All systems operational" : "Account active"}
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        ></button>
      )}

      <section className="main-content">
        <nav className="navbar topbar px-3 px-md-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="dashboard-toggle"
              aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
              title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <i className={`bi ${sidebarOpen ? "bi-layout-sidebar-inset" : "bi-list"}`}></i>
            </button>

            <div>
              <h5 className="fw-bold mb-0 text-success">
                {isAdmin ? "Barangay Administration" : "Barangay Online Service System"}
              </h5>
              <small className="text-secondary">
                {isAdmin
                  ? "Management overview and daily operations"
                  : "Resident dashboard and online services"}
              </small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-light position-relative rounded-circle"
              style={{ width: "42px", height: "42px" }}
              aria-label="Notifications"
            >
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {isAdmin ? "4" : "3"}
              </span>
            </button>

            <div className="d-flex align-items-center gap-2">
              <div className="avatar">{isAdmin ? "AD" : "EF"}</div>
              <div className="d-none d-md-block">
                <div className="fw-bold small">
                  {isAdmin ? "Administrator" : "Eliz Francisco"}
                </div>
                <small className="text-secondary">
                  {isAdmin ? "Barangay Official" : "Resident"}
                </small>
              </div>
            </div>
          </div>
        </nav>

        <main className="dashboard-page-content">
          {children}
        </main>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function UserOverview({ onRequestService, onViewRequests }) {
  const [requestStats, setRequestStats] = useState({ total: 0, pending: 0, completed: 0 });
  useEffect(() => {
    let cancelled = false;
    fetch("https://os-system-ubjr.onrender.com/api/requests")
      .then((response) => { if (!response.ok) throw new Error("Request list unavailable"); return response.json(); })
      .then((data) => {
        if (!Array.isArray(data) || cancelled) return;
        setRequestStats({
          total: data.length,
          pending: data.filter((item) => String(item.status || "Pending").toLowerCase() === "pending").length,
          completed: data.filter((item) => String(item.status || "").toLowerCase() === "completed").length,
        });
      }).catch((error) => console.warn("Dashboard counts could not be loaded:", error));
    return () => { cancelled = true; };
  }, []);
  const openServices = (event) => { event.preventDefault(); onRequestService?.(); };
  return (
      <div className="p-4">
       
        <div className="welcome-card p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge bg-warning text-dark mb-2">RESIDENT PORTAL</span>
              <h2 className="fw-bold">Good afternoon, Eliz!</h2>
              <p className="mb-0 opacity-75">Welcome to your Barangay Online
                            Service dashboard. What would
                            you like to do today?</p>
            </div>
           
          </div>
        </div>
        
        <div className="row g-3 mb-4">
          
          <div className="col-sm-6 col-xl-3">
            <div className="card stat-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-secondary">MY REQUESTS</small>
                    <div className="stat-number text-success">{requestStats.total}</div>
                    <small>Total submitted</small>
                  </div>
                  <div className="stat-icon bg-success-subtle text-success">
                    <i className="bi bi-file-earmark-text"></i>
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
                    <small className="text-secondary">PENDING</small>
                    <div className="stat-number text-warning">{requestStats.pending}</div>
                    <small>Waiting for review</small>
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
                    <small className="text-secondary">COMPLETED</small>
                    <div className="stat-number text-primary">{requestStats.completed}</div>
                    <small>Successfully processed</small>
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
                    <small className="text-secondary">NOTIFICATIONS</small>
                    <div className="stat-number text-danger">—</div>
                    <small>Unread updates</small>
                  </div>
                  <div className="stat-icon bg-danger-subtle text-danger">
                    <i className="bi bi-bell"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card dashboard-card p-4 mb-4" id="services">
          <div className="mb-3">
            <h5 className="fw-bold mb-1">Barangay Services</h5>
            <small className="text-secondary">Select a service to submit your request online.</small>
          </div>
          <div className="row g-3">
            
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-success-subtle text-success">
                  <i className="bi bi-file-earmark-check-fill"></i>
                </div>
                <div className="fw-bold">Barangay Clearance</div>
                <small className="text-secondary">Request clearance</small>
              </a>
            </div>
           
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-primary-subtle text-primary">
                  <i className="bi bi-person-vcard-fill"></i>
                </div>
                <div className="fw-bold">Certificate of Residency</div>
                <small className="text-secondary">Request certificate</small>
              </a>
            </div>
            {/* INDIGENCY */}
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-warning-subtle text-warning">
                  <i className="bi bi-file-earmark-person-fill"></i>
                </div>
                <div className="fw-bold">Certificate of Indigency</div>
                <small className="text-secondary">Request Indigency</small>
              </a>
            </div>
            {/* BUSINESS */}
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-danger-subtle text-danger">
                  <i className="bi bi-shop"></i>
                </div>
                <div className="fw-bold">Business Clearance</div>
                <small className="text-secondary">Business services</small>
              </a>
            </div>
            {/* CERTIFICATIONS */}
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-info-subtle text-info">
                  <i className="bi bi-file-text-fill"></i>
                </div>
                <div className="fw-bold">Other Certifications</div>
                <small className="text-secondary">View certificates</small>
              </a>
            </div>
            {/* APPOINTMENT */}
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-success-subtle text-success">
                  <i className="bi bi-calendar-plus-fill"></i>
                </div>
                <div className="fw-bold">Book Appointment</div>
                <small className="text-secondary">Schedule a visit</small>
              </a>
            </div>
            
            {/* MORE */}
            <div className="col-6 col-md-4 col-xl-3">
              <a className="service-button" href="/request-service" onClick={openServices}>
                <div className="service-icon bg-secondary-subtle text-secondary">
                  <i className="bi bi-three-dots"></i>
                </div>
                <div className="fw-bold">More Services</div>
                <small className="text-secondary">View all services</small>
              </a>
            </div>
          </div>
        </div>
        {/* =========================================
                 MY SERVICE REQUESTS
            ========================================== */}
        <div className="card dashboard-card mb-4" id="my-requests">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-1">
                  <i className="bi bi-clock-history text-success me-2"></i>
                  My Service Requests
                </h5>
                <small className="text-secondary">Track the status of your submitted requests.</small>
              </div>
              <button className="btn btn-outline-success btn-sm" type="button" onClick={onViewRequests}>View All</button>
            </div>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Request ID</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1024</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="request-icon bg-success-subtle text-success">
                          <i className="bi bi-file-earmark-check"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Barangay Clearance</div>
                          <small className="text-secondary">Document Request</small>
                        </div>
                      </div>
                    </td>
                    <td>May 1, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-2">Pending</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1020</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="request-icon bg-primary-subtle text-primary">
                          <i className="bi bi-person-vcard"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Certificate of Residency</div>
                          <small className="text-secondary">Certificate Request</small>
                        </div>
                      </div>
                    </td>
                    <td>April 28, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">Approved</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1017</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="request-icon bg-warning-subtle text-warning">
                          <i className="bi bi-file-earmark-person"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Certificate of Indigency</div>
                          <small className="text-secondary">Certificate Request</small>
                        </div>
                      </div>
                    </td>
                    <td>April 24, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">Completed</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1014</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="request-icon bg-danger-subtle text-danger">
                          <i className="bi bi-shop"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Business Clearance</div>
                          <small className="text-secondary">Business Service</small>
                        </div>
                      </div>
                    </td>
                    <td>April 20, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-info-subtle text-info px-3 py-2">Processing</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* =========================================
                 ANNOUNCEMENTS + SCHEDULE
            ========================================== */}
        <div className="row g-4 mb-4">
          {/* ANNOUNCEMENTS */}
          <div className="col-xl-7" id="announcements">
            <div className="card dashboard-card h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-1">Latest Announcements</h5>
                <small className="text-secondary">Important information from your barangay.</small>
                {/* ANNOUNCEMENT 1 */}
                <div className="announcement mt-3">
                  <div className="d-flex gap-3">
                    <i className="bi bi-bell-fill text-warning fs-4 flex-shrink-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Change in Office Hours</h6>
                      <p className="small text-secondary mb-1">Office hours will be from
                                            8:00 AM to 5:00 PM.</p>
                      <small className="text-secondary">April 28, 2026</small>
                    </div>
                  </div>
                </div>
                {/* ANNOUNCEMENT 2 */}
                <div className="announcement">
                  <div className="d-flex gap-3">
                    <i className="bi bi-calendar-check-fill text-success fs-4 flex-shrink-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Community Clean-Up Drive</h6>
                      <p className="small text-secondary mb-1">Join the community clean-up
                                            drive on May 12, 2026.</p>
                      <small className="text-secondary">April 25, 2026</small>
                    </div>
                  </div>
                </div>
                {/* ANNOUNCEMENT 3 */}
                <div className="announcement mb-0">
                  <div className="d-flex gap-3">
                    <i className="bi bi-alarm-fill text-danger fs-4 flex-shrink-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Business Clearance Renewal</h6>
                      <p className="small text-secondary mb-1">Business owners are reminded
                                            to renew their clearance.</p>
                      <small className="text-secondary">April 20, 2026</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SCHEDULE */}
          <div className="col-xl-5" id="schedule">
            <div className="card dashboard-card h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-1">Upcoming Schedule</h5>
                <small className="text-secondary">Barangay activities and events</small>
                <div className="schedule-item mt-4">
                  <div className="schedule-time">May 5, 2026</div>
                  <div className="fw-semibold">Barangay Assembly</div>
                  <small className="text-secondary">9:00 AM • Barangay Hall</small>
                </div>
                <div className="schedule-item">
                  <div className="schedule-time">May 12, 2026</div>
                  <div className="fw-semibold">Community Clean-Up Drive</div>
                  <small className="text-secondary">7:00 AM • Barangay Grounds</small>
                </div>
                <div className="schedule-item mb-0">
                  <div className="schedule-time">May 20, 2026</div>
                  <div className="fw-semibold">Health and Wellness Program</div>
                  <small className="text-secondary">8:00 AM • Barangay Hall</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =========================================
                 PROFILE
            ========================================== */}
        <div className="card profile-box mb-4" id="profile">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar bg-warning text-dark" style={{ width: "65px", height: "65px", fontSize: "20px" }}>EF</div>
                  <div>
                    <h5 className="fw-bold mb-1">Eliz Francisco</h5>
                    <p className="mb-1 opacity-75">Barangay Resident</p>
                    <small className="opacity-75">Zone 3 • Account Active</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button className="btn btn-warning fw-bold">
                  <i className="bi bi-person-gear me-2"></i>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <div className="text-center mt-5 pt-3 pb-4">
          <small className="text-secondary">
            © 2026 Barangay Online Service System
            <span className="mx-2">•</span>
            Resident Portal
          </small>
        </div>
      </div>
  );
}

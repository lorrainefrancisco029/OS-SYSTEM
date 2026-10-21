import React from "react";

export default function AdminOverview() {
  return (
      <div className="p-4">
       
        <div className="welcome-card p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge bg-warning text-dark mb-2">ADMIN CONTROL CENTER</span>
              <h2 className="fw-bold">Good day! Administrator.</h2>
              <p className="mb-0 opacity-75">Here's a quick look at what needs
                            your attention today.</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button className="btn btn-warning fw-bold">
                <i className="bi bi-plus-lg me-2"></i>
                Create Announcement
              </button>
            </div>
          </div>
        </div>
       
        <div className="row g-3 mb-4">
          
          <div className="col-sm-6 col-xl-3">
            <div className="card stat-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-secondary">NEEDS ATTENTION</small>
                    <div className="stat-number text-warning">12</div>
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
                    <div className="stat-number text-success">18</div>
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
                    <div className="stat-number text-primary">86%</div>
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
                    <div className="stat-number text-danger">4</div>
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
        {/* =================================================
                 ACTION CENTER
            ================================================== */}
        <div className="card dashboard-card p-4 mb-4" id="services">
          <div className="mb-3">
            <h5 className="fw-bold mb-1">Action Center</h5>
            <small className="text-secondary">Frequently used administrative tools</small>
          </div>
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <a className="action-button" href="#recent-requests">
                <div className="action-icon bg-warning-subtle text-warning">
                  <i className="bi bi-inbox-fill"></i>
                </div>
                <div className="fw-bold">Review Requests</div>
                <small className="text-secondary">12 waiting</small>
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
        {/* =================================================
                 RECENT SERVICE REQUESTS
            ================================================== */}
        <div className="card dashboard-card mb-4" id="recent-requests">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-1">
                  <i className="bi bi-clock-history text-success me-2"></i>
                  Recent Service Requests
                </h5>
                <small className="text-secondary">Latest requests submitted through
                                the online barangay services</small>
              </div>
              <button className="btn btn-outline-success btn-sm">View All</button>
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
                          <i className="bi bi-file-earmark-text"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Barangay Clearance</div>
                          <small className="text-secondary">Document Request</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold">Juan Dela Cruz</div>
                      <small className="text-secondary">Zone 3</small>
                    </td>
                    <td>May 1, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-2">Pending</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-success">Review</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1023</strong>
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
                    <td>
                      <div className="fw-semibold">Maria Santos</div>
                      <small className="text-secondary">Zone 1</small>
                    </td>
                    <td>May 1, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">Approved</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1022</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="request-icon bg-warning-subtle text-warning">
                          <i className="bi bi-shop"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Business Clearance</div>
                          <small className="text-secondary">Business Service</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold">Ana Reyes</div>
                      <small className="text-secondary">Zone 4</small>
                    </td>
                    <td>April 30, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-info-subtle text-info px-3 py-2">Processing</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="text-success">#BRG-1021</strong>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="request-icon bg-danger-subtle text-danger">
                          <i className="bi bi-house-check"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Certificate of Indigency</div>
                          <small className="text-secondary">Certificate Request</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold">Pedro Garcia</div>
                      <small className="text-secondary">Zone 2</small>
                    </td>
                    <td>April 30, 2026</td>
                    <td>
                      <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">Completed</span>
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
        {/* =================================================
                 SCHEDULE + ANNOUNCEMENTS
            ================================================== */}
        <div className="row g-4 mb-4">
          {/* SCHEDULE */}
          <div className="col-xl-5" id="schedule">
            <div className="card dashboard-card h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-1">Today's Schedule</h5>
                <small className="text-secondary">Daily activities</small>
                <div className="schedule-item mt-4">
                  <div className="schedule-time">8:00 AM</div>
                  <div className="fw-semibold">Office Opening</div>
                  <small className="text-secondary">Barangay Hall</small>
                </div>
                <div className="schedule-item">
                  <div className="schedule-time">10:30 AM</div>
                  <div className="fw-semibold">Resident Consultation</div>
                  <small className="text-secondary">Session Room</small>
                </div>
                <div className="schedule-item">
                  <div className="schedule-time">2:00 PM</div>
                  <div className="fw-semibold">Community Meeting</div>
                  <small className="text-secondary">Barangay Hall</small>
                </div>
                <div className="schedule-item mb-0">
                  <div className="schedule-time">5:00 PM</div>
                  <div className="fw-semibold">Office Closing</div>
                  <small className="text-secondary">Barangay Hall</small>
                </div>
              </div>
            </div>
          </div>
          {/* ANNOUNCEMENTS */}
          <div className="col-xl-7" id="announcements">
            <div className="card dashboard-card h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-1">Live Announcements</h5>
                <small className="text-secondary">Information visible to residents</small>
                {/* ANNOUNCEMENT 1 */}
                <div className="announcement mt-3">
                  <div className="d-flex gap-3">
                    <i className="bi bi-bell-fill text-warning fs-4 flex-shrink-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Change in Office Hours</h6>
                      <p className="small text-secondary mb-1">Office hours will be from
                                            8:00 AM to 5:00 PM.</p>
                      <small className="text-secondary">Published April 28, 2026</small>
                    </div>
                  </div>
                </div>
                {/* ANNOUNCEMENT 2 */}
                <div className="announcement">
                  <div className="d-flex gap-3">
                    <i className="bi bi-calendar-check-fill text-success fs-4 flex-shrink-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Community Clean-Up Drive</h6>
                      <p className="small text-secondary mb-1">Community clean-up drive
                                            scheduled for May 12.</p>
                      <small className="text-secondary">Published April 25, 2026</small>
                    </div>
                  </div>
                </div>
                {/* ANNOUNCEMENT 3 */}
                <div className="announcement mb-0">
                  <div className="d-flex gap-3">
                    <i className="bi bi-alarm-fill text-danger fs-4 flex-shrink-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Business Clearance Renewal</h6>
                      <p className="small text-secondary mb-1">Renewal deadline is
                                            May 31, 2026.</p>
                      <small className="text-secondary">Published April 20, 2026</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =================================================
                 DAILY SUMMARY
            ================================================== */}
        <div className="card dashboard-card mb-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-1">Daily Summary</h5>
            <small className="text-secondary">Today's system activity</small>
            <div className="row mt-4 g-4">
              <div className="col-md-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Completed requests</span>
                  <strong className="text-success">24</strong>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-success" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Pending requests</span>
                  <strong className="text-warning">12</strong>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-warning" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Active announcements</span>
                  <strong className="text-primary">3</strong>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-primary" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
            <div className="alert alert-success mt-4 mb-0">
              <i className="bi bi-check-circle-fill me-2"></i>
              <strong>System operational</strong>
              <br/>
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

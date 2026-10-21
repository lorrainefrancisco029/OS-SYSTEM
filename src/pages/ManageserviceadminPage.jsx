import React from "react";

export default function ManageserviceadminPage({ onBack }) {
  const addService = () => alert("Add Service button clicked.");
  const editService = (serviceName) => alert(`Editing: ${serviceName}`);
  return (
    <>
  <div className="container">
    {/* PAGE TITLE */}
    <div className="page-title">MANAGE SERVICES (ADMIN)</div>
    {/* MAIN CARD */}
    <div className="card">
      {/* BREADCRUMB */}
      <div className="breadcrumb">Services  /  Manage Services</div>
      {/* HEADER */}
      <div className="header">
        <h2>Manage Services</h2>
        <button className="add-btn" onClick={addService}>ADD SERVICE</button>
      </div>
      {/* SERVICES TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Barangay Clearance</td>
              <td>Request and obtain your barangay clearance.</td>
              <td className="status">Active</td>
              <td>
                <button className="edit-btn" onClick={() => editService("Barangay Clearance")}>Edit</button>
              </td>
            </tr>
            <tr>
              <td>Certificate of Indigency</td>
              <td>Apply for a Certificate of Indigency.</td>
              <td className="status">Active</td>
              <td>
                <button className="edit-btn" onClick={() => editService("Certificate of Indigency")}>Edit</button>
              </td>
            </tr>
            <tr>
              <td>Business Clearance</td>
              <td>Apply for a Business Clearance.</td>
              <td className="status">Active</td>
              <td>
                <button className="edit-btn" onClick={() => editService("Business Clearance")}>Edit</button>
              </td>
            </tr>
            <tr>
              <td>Certificate of Residency</td>
              <td>Request a certificate of residency.</td>
              <td className="status">Active</td>
              <td>
                <button className="edit-btn" onClick={() => editService("Certificate of Residency")}>Edit</button>
              </td>
            </tr>
            <tr>
              <td>Others</td>
              <td>Other barangay related services.</td>
              <td className="status">Active</td>
              <td>
                <button className="edit-btn" onClick={() => editService("Others")}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {/* BACK BUTTON */}
    <div className="back-container">
      <button className="back-btn" type="button" onClick={() => onBack ? onBack() : (window.location.href = "/admin-dashboard")}>BACK</button>
    </div>
  </div>
    </>
  );
}

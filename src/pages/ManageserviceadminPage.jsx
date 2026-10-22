import React, { useEffect, useState } from "react";

const DEFAULT_SERVICES = [
  { id: "clearance", name: "Barangay Clearance", description: "Request and obtain your barangay clearance.", status: "Active" },
  { id: "indigency", name: "Certificate of Indigency", description: "Apply for a Certificate of Indigency.", status: "Active" },
  { id: "business", name: "Business Clearance", description: "Apply for a Business Clearance.", status: "Active" },
  { id: "residency", name: "Certificate of Residency", description: "Request a certificate of residency.", status: "Active" },
  { id: "others", name: "Others", description: "Other barangay related services.", status: "Active" },
];
const STORAGE_KEY = "osSystemServices";

export default function ManageserviceadminPage({ onBack }) {
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
    } catch { return DEFAULT_SERVICES; }
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const addService = () => {
    const name = window.prompt("Enter the new service name:");
    if (name === null) return;
    if (!name.trim()) { setMessage("Please enter a service name."); return; }
    if (services.some((service) => service.name.toLowerCase() === name.trim().toLowerCase())) {
      setMessage("That service already exists."); return;
    }
    const description = window.prompt("Enter a short service description:") ?? "";
    setServices((current) => [...current, { id: `service-${Date.now()}`, name: name.trim(), description: description.trim(), status: "Active" }]);
    setMessage("Service added and saved in this browser.");
  };

  const editService = (service) => {
    const name = window.prompt("Edit service name:", service.name);
    if (name === null) return;
    if (!name.trim()) { setMessage("Service name cannot be empty."); return; }
    const description = window.prompt("Edit service description:", service.description);
    if (description === null) return;
    setServices((current) => current.map((item) => item.id === service.id ? { ...item, name: name.trim(), description: description.trim() } : item));
    setMessage("Service updated and saved in this browser.");
  };

  const toggleStatus = (service) => {
    setServices((current) => current.map((item) => item.id === service.id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item));
    setMessage(`${service.name} status changed.`);
  };

  const deleteService = (service) => {
    if (!window.confirm(`Delete “${service.name}” from this browser's service list?`)) return;
    setServices((current) => current.filter((item) => item.id !== service.id));
    setMessage("Service removed from this browser's list.");
  };

  return (
    <div className="container">
      <div className="page-title">MANAGE SERVICES (ADMIN)</div>
      <div className="card">
        <div className="breadcrumb">Services / Manage Services</div>
        <div className="header">
          <h2>Manage Services</h2>
          <button className="add-btn" type="button" onClick={addService}>ADD SERVICE</button>
        </div>
        {message && <div className="alert alert-info mx-3" role="status">{message}</div>}
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Service Name</th><th>Description</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {services.length === 0 ? <tr><td colSpan="4" className="text-center py-4">No services yet. Select ADD SERVICE to create one.</td></tr> : services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td><td>{service.description}</td>
                  <td className="status">{service.status}</td>
                  <td className="d-flex flex-wrap gap-2">
                    <button className="edit-btn" type="button" onClick={() => editService(service)}>Edit</button>
                    <button className="edit-btn" type="button" onClick={() => toggleStatus(service)}>{service.status === "Active" ? "Deactivate" : "Activate"}</button>
                    <button className="edit-btn" type="button" onClick={() => deleteService(service)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="back-container">
        <button className="back-btn" type="button" onClick={() => onBack ? onBack() : (window.location.href = "/admin-dashboard")}>BACK</button>
      </div>
    </div>
  );
}

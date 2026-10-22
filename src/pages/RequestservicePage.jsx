import React, { useState } from "react";

const SERVICES = [
  {
    name: "Barangay Clearance",
    description: "Request clearance",
    icon: "bi-file-earmark-check-fill",
    iconClass: "bg-success-subtle text-success",
  },
  {
    name: "Certificate of Residency",
    description: "Request certificate",
    icon: "bi-person-vcard-fill",
    iconClass: "bg-primary-subtle text-primary",
  },
  {
    name: "Certificate of Indigency",
    description: "Submit request",
    icon: "bi-file-earmark-person-fill",
    iconClass: "bg-warning-subtle text-warning",
  },
  {
    name: "Business Clearance",
    description: "Business services",
    icon: "bi-shop",
    iconClass: "bg-danger-subtle text-danger",
  },
  {
    name: "Other Certifications",
    description: "View certifications",
    icon: "bi-file-text-fill",
    iconClass: "bg-info-subtle text-info",
  },
  {
    name: "Book Appointment",
    description: "Schedule a visit",
    icon: "bi-calendar-plus-fill",
    iconClass: "bg-success-subtle text-success",
  },
  {
    name: "Community Programs",
    description: "View programs",
    icon: "bi-people-fill",
    iconClass: "bg-warning-subtle text-warning",
  },
  {
    name: "More Services",
    description: "View all services",
    icon: "bi-three-dots",
    iconClass: "bg-secondary-subtle text-secondary",
  },
];

export default function RequestservicePage({ onBack, onSubmitted }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    purpose: "",
    contactNumber: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const goBackToDashboard = () => {
    if (onBack) onBack();
  };

  const chooseService = (service) => {
    setSelectedService(service);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const continueToForm = () => {
    if (!selectedService) {
      alert("Please select a service.");
      return;
    }
    setStep(2);
  };

  const submitRequest = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://os-system-ubjr.onrender.com/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service: selectedService,
          fullName: formData.fullName,
          address: formData.address,
          purpose: formData.purpose,
          contactNumber: formData.contactNumber,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime 
        })
      });

      if (!response.ok) {
        throw new Error("Unable to submit request.");
      }

      const data = await response.json();

      console.log("Backend response:", data);

      localStorage.removeItem("selectedService");

      alert("Your request has been submitted successfully!");

      if (onSubmitted) {
        onSubmitted();
      } else {
        setStep(1);
        setSelectedService("");
        setFormData({
          fullName: "",
          address: "",
          purpose: "",
          contactNumber: "",
          appointmentDate: "",
          appointmentTime: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Unable to submit your request. Please make sure the backend server is running.");
    }
  };

  return (
    <div className="page-container p-4 p-md-5">
      {step === 1 && (
        <>
          <div className="card dashboard-card p-4 mb-4">
            <h2 className="fw-bold mb-2">Barangay Services</h2>
            <p className="text-secondary mb-4">
              Select a service to submit your request online.
            </p>

            <div className="row g-3">
            {SERVICES.map((service) => (
              <div className="col-6 col-md-4 col-xl-3" key={service.name}>
                <button
                  type="button"
                  className={`service-button text-start w-100 h-100 border ${
                    selectedService === service.name ? "service-button-selected" : ""
                  }`}
                  onClick={() => chooseService(service.name)}
                >
                  <div className={`service-icon ${service.iconClass}`}>
                    <i className={`bi ${service.icon}`}></i>
                  </div>
                  <div className="fw-bold mt-3">{service.name}</div>
                  <small className="text-secondary">{service.description}</small>
                </button>
              </div>
            ))}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="btn btn-outline-secondary" type="button" onClick={goBackToDashboard}>
              BACK
              </button>
              <button
                className="btn btn-dark next-btn"
              type="button"
              onClick={continueToForm}
                disabled={!selectedService}
              >
                NEXT
              </button>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-4">
            <small className="text-secondary">
              Dashboard <span className="mx-2">/</span> Services <span className="mx-2">/</span>
              <strong>Service Form</strong>
            </small>
          </div>

          <p className="text-secondary mb-2">Step 2 of 2: Fill Out the Form</p>
          <h6 className="fw-bold mb-4">
            Service Selected: <span className="text-success">{selectedService}</span>
          </h6>

          <div className="form-card p-4">
            <form onSubmit={submitRequest}>
              <div className="row mb-3">
                <label className="col-md-3 col-form-label fw-semibold">Full Name</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleFieldChange}
                    required
                    type="text"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label fw-semibold">Address</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    name="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleFieldChange}
                    required
                    type="text"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label fw-semibold">Purpose</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    name="purpose"
                    placeholder="Example: Employment"
                    value={formData.purpose}
                    onChange={handleFieldChange}
                    type="text"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label fw-semibold">Contact Number</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    name="contactNumber"
                    placeholder="09XX XXX XXXX"
                    value={formData.contactNumber}
                    onChange={handleFieldChange}
                    type="tel"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label fw-semibold">Appointment Date</label>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleFieldChange}
                    type="date"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-3 col-form-label fw-semibold">Appointment Time</label>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleFieldChange}
                    type="time"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between gap-2 mt-4">
                <button className="btn btn-outline-secondary" type="button" onClick={() => setStep(1)}>
                  BACK
                </button>
                <button className="btn btn-dark px-4" type="submit">
                  SUBMIT REQUEST
                </button>
              </div>
            </form>
          </div>
        </>
      )}


    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function ServiceformPage() {
  const [selectedService] = useState(
    localStorage.getItem("selectedService") || "Barangay Clearance"
  );

  const [requests, setRequests] = useState([]);
  const [Service, setSelectedService] = useState("");
  const [fullName, setfullName] = useState("");
  const [address, setaddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const api_url = "http://localhost:8080/api/requests";

  async function formSubmit(e) {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    console.log("Service:", selectedService);
    console.log("Full Name:", fullName);
    console.log("Address:", address);
    console.log("Purpose:", purpose);
    console.log("Contact Number:", contactNumber);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service: selectedService,
          fullName: fullName,
          address: address,
          purpose: purpose,
          contactNumber: contactNumber,
          appointmentDate: appointmentDate,
          appointmentTime: appointmentTime
        })
      });

      const data = await response.json();

      console.log("Backend response:", data);

    } catch (err) {
      console.log("ERROR:", err);
    }
  }

  return (
    <>
      <div className="page-container p-4 p-md-5">

        <div className="mb-4">
          <small className="text-secondary">
            Dashboard
            <span className="mx-2">/</span>
            Request Service
            <span className="mx-2">/</span>
            <strong>Service Form</strong>
          </small>
        </div>

        <p className="text-secondary mb-2">
          Step 2 of 3: Fill Out the Form
        </p>

        <h6 className="fw-bold mb-4">
          Service Selected:
          <span className="text-success" id="selectedService">
            {selectedService}
          </span>
        </h6>

        <div className="form-card p-4">

          <form id="serviceForm" onSubmit={formSubmit}>

            {/* FULL NAME */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-semibold">
                Full Name
              </label>

              <div className="col-md-9">
                <input
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setfullName(event.target.value)
                  }
                />
              </div>
            </div>


            {/* ADDRESS */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-semibold">
                Address
              </label>

              <div className="col-md-9">
                <input
                  className="form-control"
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={(event) =>
                    setaddress(event.target.value)
                  }
                />
              </div>
            </div>


            {/* PURPOSE */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-semibold">
                Purpose
              </label>

              <div className="col-md-9">
                <input
                  className="form-control"
                  id="purpose"
                  name="purpose"
                  placeholder="Example: Employment"
                  type="text"
                  value={purpose}
                  onChange={(event) =>
                    setPurpose(event.target.value)
                  }
                />
              </div>
            </div>


            {/* CONTACT NUMBER */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-semibold">
                Contact Number
              </label>

              <div className="col-md-9">
                <input
                  className="form-control"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="09XX XXX XXXX"
                  type="tel"
                  value={contactNumber}
                  onChange={(event) =>
                    setContactNumber(event.target.value)
                  }
                />
              </div>
            </div>


            {/* APPOINTMENT DATE */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-semibold">
                Appointment Date
              </label>

              <div className="col-md-4">
                <input
                  className="form-control"
                  id="appointmentDate"
                  name="appointmentDate"
                  type="date"
                  value={appointmentDate}
                  onChange={(event) =>
                    setAppointmentDate(event.target.value)
                  }
                />
              </div>
            </div>


            {/* APPOINTMENT TIME */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-semibold">
                Appointment Time
              </label>

              <div className="col-md-4">
                <input
                  className="form-control"
                  id="appointmentTime"
                  name="appointmentTime"
                  type="time"
                  value={appointmentTime}
                  onChange={(event) =>
                    setAppointmentTime(event.target.value)
                  }
                />
              </div>
            </div>


            {/* BUTTONS */}
            <div className="d-flex justify-content-end gap-2 mt-4">

              <a
                className="btn btn-outline-secondary"
                href="/request-service"
              >
                BACK
              </a>

              <button
                className="btn btn-dark px-4"
                type="submit"
                onClick={() =>
                  console.log("NEXT BUTTON CLICKED")
                }
              >
                NEXT
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
}
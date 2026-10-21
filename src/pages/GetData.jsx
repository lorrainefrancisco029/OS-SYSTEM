import React, { useState, useEffect } from "react";

export default function GetData() {
  
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/requests")
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Barangay Requests</h1>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Resident Name</th>
              <th>Service</th>
              <th>Date Requested</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>{request.fullName}</td>
                <td>{request.service}</td>
                <td>{request.dateRequested}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
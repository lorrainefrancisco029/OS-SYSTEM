const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json());
app.use(cors());



let requests = [

  {
    requestId: "BRG-1020",
    service: "Certificate of Residency",
    fullName: "Juan Dela Cruz",
    dateRequested: "April 28, 2026",
    status: "Completed"
  },

  {
    requestId: "BRG-1017",
    service: "Certificate of Indigency",
    fullName: "Maria Santos",
    dateRequested: "April 25, 2026",
    status: "In Process"
  },

  {
    requestId: "BRG-1015",
    service: "Business Clearance",
    fullName: "Pedro Reyes",
    dateRequested: "April 22, 2026",
    status: "Pending"
  }

];

let residents = [
{
  id: "1001",
  number: "50"

} 
];


app.get("/api/requests", (req, res) => {

  res.json(requests);

});

app.get("/api/residents", (req, res) => {

  res.json(residents);

});


app.post("/api/requests", (req, res) => {

  const requestNumber = requests
    .map((request) => {
      const match = request.requestId?.match(/^REQ-\d+-(\d+)$/);
      return match ? Number(match[1]) : 0;
    })
    .reduce((highest, number) => Math.max(highest, number), 0) + 1;

  const newRequest = {
    requestId: `REQ-${new Date().getFullYear()}-${String(requestNumber).padStart(3, "0")}`,
    service: req.body.service,
    fullName: req.body.fullName,
    address: req.body.address,
    purpose: req.body.purpose,
    contactNumber: req.body.contactNumber,
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
    dateRequested: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }),
    status: "Pending"
  };

  requests.push(newRequest);

  console.log("=================================");
  console.log("REQUEST SUBMITTED");
  console.log("=================================");
  console.log(newRequest);
  console.log("=================================");

  res.status(201).json(newRequest);

});


app.put("/api/requests/:requestId", (req, res) => {

  const { requestId } = req.params;

  const requestIndex = requests.findIndex(
    (request) => request.requestId === requestId
  );

  if (requestIndex === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  requests[requestIndex] = {
    requestId: requestId,
    service: req.body.service,
    fullName: req.body.fullName,
    dateRequested: req.body.dateRequested,
    status: req.body.status
  };

  console.log("=================================");
  console.log("REQUEST UPDATED");
  console.log("=================================");
  console.log(requests[requestIndex]);
  console.log("=================================");

  res.json(requests[requestIndex]);

});


app.delete("/api/requests/:requestId", (req, res) => {

  const { requestId } = req.params;

  const requestIndex = requests.findIndex(
    (request) => request.requestId === requestId
  );

  if (requestIndex === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  const deletedRequest = requests.splice(requestIndex, 1)[0];

  console.log("=================================");
  console.log("REQUEST DELETED");
  console.log("=================================");
  console.log(deletedRequest);
  console.log("CURRENT REQUESTS:");
  console.log(requests);
  console.log("=================================");

  res.json(deletedRequest);

});


app.listen(8080, () => {

  console.log("Server running on https://os-system-ubjr.onrender.com");

});

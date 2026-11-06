
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 8080;

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "barangay_os_db"
});

app.use(express.json());
app.use(cors());

let residents = [
    {
        id: "1001",
        number: "50"
    }
];

app.get("/api/residents", (req, res) => {
    res.json(residents);
});

// CHECK DATABASE CONNECTION
db.getConnection()
    .then(connection => {
        console.log("Database Connected");
        connection.release();
    })
    .catch(error => {
        console.log("Database Connection Failed:", error);
    });

// SELECT - GET ALL REQUESTS
app.get("/api/requests", async (req, res) => {
    try {
        const [requests] = await db.query(
            `SELECT
                request_id AS id,
                request_code AS requestId,
                service,
                full_name AS fullName,
                address,
                purpose,
                contact_number AS contactNumber,
                appointment_date AS appointmentDate,
                appointment_time AS appointmentTime,
                date_requested AS dateRequested,
                status,
                remarks
             FROM service_requests`
        );

        res.json(requests);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// INSERT - ADD NEW REQUEST
app.post("/api/requests", async (req, res) => {
    try {
        const {
            service,
            fullName,
            address,
            purpose,
            contactNumber,
            appointmentDate,
            appointmentTime
        } = req.body;

        const date = new Date();
        const dateRequested =
            `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        const requestCode =
            `REQ-${date.getFullYear()}-${Date.now()}`;

        const [result] = await db.query(
            `INSERT INTO service_requests
            (request_code, service, full_name, address, purpose,
            contact_number, appointment_date, appointment_time,
            date_requested, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                requestCode,
                service,
                fullName,
                address,
                purpose,
                contactNumber,
                appointmentDate || null,
                appointmentTime || null,
                dateRequested,
                "Pending"
            ]
        );

        const [newRequest] = await db.query(
            `SELECT
                request_id AS id,
                request_code AS requestId,
                service,
                full_name AS fullName,
                address,
                purpose,
                contact_number AS contactNumber,
                appointment_date AS appointmentDate,
                appointment_time AS appointmentTime,
                date_requested AS dateRequested,
                status
             FROM service_requests
             WHERE request_id = ?`,
            [result.insertId]
        );

        console.log("REQUEST SUBMITTED");
        console.log(newRequest[0]);

        res.status(201).json(newRequest[0]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - EDIT REQUEST
app.put("/api/requests/:requestId", async (req, res) => {
    try {
        const { requestId } = req.params;
        const { service, fullName, status } = req.body;

        const [result] = await db.query(
            `UPDATE service_requests
             SET service = ?, full_name = ?, status = ?
             WHERE request_code = ?`,
            [service, fullName, status, requestId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        const [updatedRequest] = await db.query(
            `SELECT
                request_id AS id,
                request_code AS requestId,
                service,
                full_name AS fullName,
                date_requested AS dateRequested,
                status
             FROM service_requests
             WHERE request_code = ?`,
            [requestId]
        );

        console.log("REQUEST UPDATED");
        console.log(updatedRequest[0]);

        res.json(updatedRequest[0]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - REMOVE REQUEST
app.delete("/api/requests/:requestId", async (req, res) => {
    try {
        const { requestId } = req.params;

        const [result] = await db.query(
            "DELETE FROM service_requests WHERE request_code = ?",
            [requestId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        console.log("REQUEST DELETED");
        console.log(requestId);

        res.json({ message: "Request deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

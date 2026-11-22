require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 8080;

const app = express();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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


// GET - LOAD ALL SAVED REQUESTS
app.get("/api/requests", async (req, res) => {
    try {
        const [rows] = await db.query(
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
             FROM service_requests
             ORDER BY request_id DESC`
        );

        res.json(rows);

    } catch (error) {
        console.error("GET REQUESTS ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


// UPDATE - EDIT REQUEST AND STATUS DETAILS
app.put("/api/requests/:requestId", async (req, res) => {
    try {
        const { requestId } = req.params;

        const {
            service,
            fullName,
            status,
            remarks,
            appointmentDate,
            appointmentTime
        } = req.body;

        const fields = [];
        const values = [];

        if (service !== undefined && service !== null && service !== "") {
            fields.push("service = ?");
            values.push(service);
        }

        if (fullName !== undefined && fullName !== null && fullName !== "") {
            fields.push("full_name = ?");
            values.push(fullName);
        }

        if (status !== undefined && status !== null && status !== "") {
            fields.push("status = ?");
            values.push(status);
        }

        if (remarks !== undefined) {
            fields.push("remarks = ?");
            values.push(remarks || null);
        }

        if (appointmentDate !== undefined) {
            fields.push("appointment_date = ?");
            values.push(appointmentDate || null);
        }

        if (appointmentTime !== undefined) {
            fields.push("appointment_time = ?");
            values.push(appointmentTime || null);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: "No changes provided"
            });
        }

        values.push(requestId);

        const [result] = await db.query(
            `UPDATE service_requests
             SET ${fields.join(", ")}
             WHERE request_code = ?`,
            values
        );

        if (result.affectedRows === 0) {
            const [existing] = await db.query(
                "SELECT request_code FROM service_requests WHERE request_code = ?",
                [requestId]
            );

            if (existing.length === 0) {
                return res.status(404).json({
                    message: "Request not found"
                });
            }
        }

        const [updatedRequest] = await db.query(
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
             FROM service_requests
             WHERE request_code = ?`,
            [requestId]
        );

        res.json(updatedRequest[0]);

    } catch (error) {
        console.error("UPDATE REQUEST ERROR:", error);
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
        console.error("ADD REQUEST ERROR:", error);
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
        console.error("DELETE REQUEST ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


// ========================================
// ANNOUNCEMENTS - GET ALL
// ========================================
app.get("/api/announcements", async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT
                id,
                title,
                message AS description,
                published_date AS date
             FROM announcements
             ORDER BY id DESC`
        );

        res.json(rows);
    } catch (error) {
        console.error("GET ANNOUNCEMENTS ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// ANNOUNCEMENTS - ADD
// ========================================
app.post("/api/announcements", async (req, res) => {
    try {
        const { title, description, date } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO announcements
            (title, message, published_date)
            VALUES (?, ?, ?)`,
            [title, description, date || null]
        );

        const [rows] = await db.query(
            `SELECT id, title, message AS description,
                    published_date AS date
             FROM announcements
             WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("ADD ANNOUNCEMENT ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// ANNOUNCEMENTS - EDIT
// ========================================
app.put("/api/announcements/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date } = req.body;

        const fields = [];
        const values = [];

        if (title !== undefined) {
            fields.push("title = ?");
            values.push(title);
        }

        if (description !== undefined) {
            fields.push("message = ?");
            values.push(description);
        }

        if (date !== undefined) {
            fields.push("published_date = ?");
            values.push(date || null);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: "No changes provided"
            });
        }

        values.push(id);

        const [result] = await db.query(
            `UPDATE announcements
             SET ${fields.join(", ")}
             WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            const [existing] = await db.query(
                "SELECT id FROM announcements WHERE id = ?",
                [id]
            );

            if (existing.length === 0) {
                return res.status(404).json({
                    message: "Announcement not found"
                });
            }
        }

        const [rows] = await db.query(
            `SELECT id, title, message AS description,
                    published_date AS date
             FROM announcements
             WHERE id = ?`,
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error("EDIT ANNOUNCEMENT ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// ANNOUNCEMENTS - DELETE
// ========================================
app.delete("/api/announcements/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM announcements WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        }

        res.json({
            message: "Announcement deleted successfully"
        });
    } catch (error) {
        console.error("DELETE ANNOUNCEMENT ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// SCHEDULES - GET ALL
// ========================================
app.get("/api/schedules", async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT
                id,
                activity AS title,
                activity_time AS time,
                location
             FROM schedules
             ORDER BY id DESC`
        );

        res.json(rows);
    } catch (error) {
        console.error("GET SCHEDULES ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// SCHEDULES - ADD
// ========================================
app.post("/api/schedules", async (req, res) => {
    try {
        const { title, time, location } = req.body;

        if (!title || !time) {
            return res.status(400).json({
                message: "Activity and time are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO schedules
            (activity, activity_time, location)
            VALUES (?, ?, ?)`,
            [title, time, location || null]
        );

        const [rows] = await db.query(
            `SELECT id, activity AS title,
                    activity_time AS time, location
             FROM schedules
             WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("ADD SCHEDULE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// SCHEDULES - EDIT
// ========================================
app.put("/api/schedules/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, time, location } = req.body;

        const fields = [];
        const values = [];

        if (title !== undefined) {
            fields.push("activity = ?");
            values.push(title);
        }

        if (time !== undefined) {
            fields.push("activity_time = ?");
            values.push(time);
        }

        if (location !== undefined) {
            fields.push("location = ?");
            values.push(location || null);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: "No changes provided"
            });
        }

        values.push(id);

        const [result] = await db.query(
            `UPDATE schedules
             SET ${fields.join(", ")}
             WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            const [existing] = await db.query(
                "SELECT id FROM schedules WHERE id = ?",
                [id]
            );

            if (existing.length === 0) {
                return res.status(404).json({
                    message: "Schedule not found"
                });
            }
        }

        const [rows] = await db.query(
            `SELECT id, activity AS title,
                    activity_time AS time, location
             FROM schedules
             WHERE id = ?`,
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error("EDIT SCHEDULE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// ========================================
// SCHEDULES - DELETE
// ========================================
app.delete("/api/schedules/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM schedules WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        res.json({
            message: "Schedule deleted successfully"
        });
    } catch (error) {
        console.error("DELETE SCHEDULE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

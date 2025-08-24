const express = require("express");
const router = express.Router();
const Absence = require("../models/Absence");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware(), async (req, res) => {
  try {
    const { doctorName, role, dates, reason } = req.body;

    if (!Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({ message: "Dates are required" });
    }

    const parsedDates = dates.map(d => new Date(d));

    const newAbsence = new Absence({
      doctorName,
      role,
      dates: parsedDates,
      reason,
      status: "pending",
      notificationMessage: ""
    });

    await newAbsence.save();
    res.status(201).json(newAbsence);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const absences = await Absence.find().sort({ createdAt: -1 });
    res.json(absences);
  } catch (err) {
    res.status(500).json({ message: "Error fetching absences" });
  }
});

router.get("/my", authMiddleware(["doctor"]), async (req, res) => {
  try {
    const doctorName = req.user.fullName;
    const absences = await Absence.find({ doctorName }).sort({ createdAt: -1 });
    res.json(absences);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your absences" });
  }
});

router.patch("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Absence.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notificationMessage: status === "approved" ? "Your request has been approved. ✅" : "Your request has been rejected. ❌"
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Absence not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const deleted = await Absence.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Absence not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.delete("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    await Absence.deleteMany({});
    res.json({ message: "All absences deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete all" });
  }
});

module.exports = router;

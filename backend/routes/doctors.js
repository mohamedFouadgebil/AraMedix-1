const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); 

router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.post('/', auth(['admin']), upload.single('image'), async (req, res) => {
  try {
    const { name, job, bio } = req.body;
    const imagePath = req.file ? `/uploads/doctors/${req.file.filename}` : null;

    const doctor = new Doctor({ name, job, bio, image: imagePath });
    await doctor.save();

    res.json(doctor);
  } catch (err) {
    console.error("❌ Error adding doctor:", err);
    res.status(500).json({ message: 'An error occurred while adding the doctor.' });
  }
});

module.exports = router;

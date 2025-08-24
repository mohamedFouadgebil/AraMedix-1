/* const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const productRoutes = require('./routes/products');
const absenceRoutes = require('./routes/absences');
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/files');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/absences', absenceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get(/^\/.*\.html$/, (req, res) => {
  const filePath = path.join(__dirname, '../frontend', req.path);
  res.sendFile(filePath, err => {
    if (err) res.status(404).send("Page not found");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const productRoutes = require('./routes/products');
const absenceRoutes = require('./routes/absences');
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/files');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Verbunden mit MongoDB"))
  .catch(err => console.error("❌ MongoDB Fehler:", err));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/absences', absenceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get(/^\/.*\.html$/, (req, res) => {
  const filePath = path.join(__dirname, '../frontend', req.path);
  res.sendFile(filePath, err => {
    if (err) res.status(404).send("Seite nicht gefunden");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});

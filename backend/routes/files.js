/* const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
  }
  res.status(200).json({
    message: 'تم رفع الملف بنجاح',
    filename: req.file.filename,
    path: req.file.path
  });
});

module.exports = router;
 */

/* const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// ✅ مسار رفع الملفات
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
  }
  res.status(200).json({
    message: 'تم رفع الملف بنجاح',
    filename: req.file.filename,
    path: req.file.path
  });
});

// ✅ مسار جلب قائمة الملفات
router.get('/', (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'خطأ أثناء قراءة الملفات' });
    }

    const fileList = files.map(filename => ({
      title: filename,
      url: `http://localhost:5000/uploads/${filename}`
    }));

    res.json(fileList);
  });
});

module.exports = router;
 */


const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Keine Datei wurde hochgeladen' });
  }
  res.status(200).json({
    message: 'Datei erfolgreich hochgeladen',
    filename: req.file.filename,
    path: req.file.path
  });
});

router.get('/', (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Fehler beim Lesen der Dateien' });
    }

    const fileList = files.map(filename => ({
      title: filename,
      url: `http://localhost:5000/uploads/${filename}`
    }));

    res.json(fileList);
  });
});

router.delete('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Datei nicht gefunden oder Fehler beim Löschen' });
    }
    res.json({ message: 'Datei erfolgreich gelöscht' });
  });
});

module.exports = router;

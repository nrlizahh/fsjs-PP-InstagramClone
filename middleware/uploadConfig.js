const multer = require('multer');

// Konfigurasi untuk penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'avatar') {
        // Untuk gambar profil, simpan di folder 'uploads/profile'
        cb(null, 'uploads/profiles/');
      } else if (file.fieldname === 'imageUrl') {
        // Untuk gambar postingan, simpan di folder 'uploads/post'
        cb(null, 'uploads/posts/');
      } else {
        // Default: simpan di folder 'uploads'
        cb(null, 'uploads/');
      }
  },
  filename: function (req, file, cb) {
    // Tentukan nama file yang disimpan (misal menambahkan timestamp untuk unik)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filter untuk hanya menerima file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Terima file
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed!'), false);  // Tolak file yang tidak sesuai
  }
};

// Setup multer dengan konfigurasi storage dan file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Maksimum ukuran file 5MB
  fileFilter: fileFilter
});

module.exports = upload;

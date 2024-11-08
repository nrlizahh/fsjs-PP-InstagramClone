const multer = require('multer');

//tempat penyimpanan file
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
    //Menentukan nama file image yang akan di simpan
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// cb yang hanya menerima fil dalam bentuk gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Menerima file
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed!'), false);  //Menolak file yang tidak sesuai
  }
};

// filter gambar yang akan di simpan ke folder
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: fileFilter
});

module.exports = upload;

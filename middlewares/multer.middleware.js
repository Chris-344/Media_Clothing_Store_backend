import multer from "multer";

// cb is callback
//image file disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}-${file.originalname}-${uniqueSuffix}`);
  },
});

export const upload = multer({ storage: storage });

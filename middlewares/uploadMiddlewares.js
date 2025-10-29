import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, PNG, and WEBP files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;




// import cloudinary from "../config/cloudinary.js";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// // Cloudinary upload middleware
// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {  
//         folder: "movieApp",
//         allowed_formats: ["jpg", "png", "jpeg", "webp"],
//     },
// });

// const upload = multer({ storage});
// export default upload;
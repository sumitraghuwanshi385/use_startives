const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const allowedMimeTypes = [

"image/jpeg",
"image/jpg",
"image/png",
"image/gif",
"image/webp",
"image/heic",
"image/heif",

"application/pdf",
"application/msword",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",

"application/vnd.ms-excel",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

"application/vnd.ms-powerpoint",
"application/vnd.openxmlformats-officedocument.presentationml.presentation",

"text/plain",
"text/csv",

"application/zip",
"application/x-zip-compressed",
"application/x-rar-compressed",

"application/json"

];

const storage = new CloudinaryStorage({
cloudinary,
params: {
folder: "startives"
}
});

const upload = multer({

storage: storage,

limits: { fileSize: 25 * 1024 * 1024 },

fileFilter: function (req, file, cb) {

if (allowedMimeTypes.includes(file.mimetype)) {
cb(null, true);
} else {
cb(new Error("File type not supported"));
}

}

});

export default upload;
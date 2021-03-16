const multer = require("multer");

const path = require("path"); //enables cross platform paths

//handles file uploads
//stores all uploaded files in uploads directory
//unvalidated files are in tmp, validadet images get stored under uploads/profilepictures and uploads/spotimages

const fileStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        switch(file.fieldname)
        {
            case "addpp": //profilepicture
                cb(null, path.join(__dirname, "..", "uploads", "tmp", "profilepictures"));
                break;
            case "addimage":
                cb(null, path.join(__dirname, "..", "uploads", "tmp", "spotimages"));
                break;
            default:
                cb(null, path.join(__dirname, "..", "uploads", "tmp", "wierd")); //files that come from different client like postman
        }
    },
    filename: function (req, file, cb) {
        if(req.session.uname)
            cb(null, req.session.uname + ".png");
        else
            cb(null, file.originalname);
    }
})

function fileFilter(req, file, cb)
{
    if(file.mimetype.startsWith("image")) //image/png, image/jpeg , image/...
    {
        cb(null, true);
    } else{
        cb("Not an image", false);
    }
}

const uploaded = multer({
    storage:fileStorage,
    fileFilter: fileFilter
});




module.exports = uploaded;
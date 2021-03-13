const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        switch(file.fieldname)
        {
            case "addpp": //profilepicture
                cb(null, __dirname + "/uploads/profilepictures");
                break;
            default:
                cb(null, __dirname + "/uploads/wierd"); //files that come from different client like postman
        }
    },
    filename: function (req, file, cb) {
        switch(file.fieldname)
        {
            case "addpp": //profilepicture
                cb(null, req.session.uname + ".png");
            break;
            default:
                console.log("image spots must be added");
                cb(null, "crab");
        }
    }
})

function fileFilter(req, file, cb)
{
    if(file.mimetype.startsWith("image")) //image/png, image/jpg , image/...
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
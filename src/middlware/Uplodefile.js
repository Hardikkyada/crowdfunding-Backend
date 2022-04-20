const multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/')
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, file?.fieldname + '-'+ Date.now()+file?.originalname)
    }
})

var upload = multer({ storage: storage })

// console.log(upload);

module.exports = upload
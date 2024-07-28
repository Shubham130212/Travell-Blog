const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
    const fileExtension=file.originalname.split('.').pop().toLowerCase()
    if (['jpeg','jpg','png'].includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Only images with jpeg, jpg or png are allowed'), false);
    }
};
const uploadFile = multer({ storage: storage, limits:{fileSize:1*1024*1024}, fileFilter: fileFilter }).single('image');


module.exports=uploadFile;
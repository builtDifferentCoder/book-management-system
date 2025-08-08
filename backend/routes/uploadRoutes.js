
import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __dirname=path.resolve()
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, cb) {
        const extname=path.extname(file.originalname);
        cb(null,`${file.fieldname}-${Date.now()}${extname}`);
    }
})

const fileFilter = (req, file, cb) => {
    const fileTypes=/jpe?g|webp|png/
    const mimeTypes=/image\/jpe?g|image\/png|image\/webp/

    const extname=path.extname(file.originalname);
    const mimeType=file.mimetype;

    if(fileTypes.test(extname)&&mimeTypes.test(mimeType)){
        cb(null, true);
    }else{
        cb(new Error("Images only"),false)
    }
}

const upload=multer({storage,fileFilter})
const uploadSingleImage=upload.single("image");

router.post("/",(req,res)=>{
    uploadSingleImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                message: err.message,
            })
        }else if(req.file){
            res.status(200).send({
                message:"Image uploaded successfully",
                image:`/uploads/${req.file.path}`
            })
        }else{
            res.status(400).send({
                message:"No image uploaded",
            })
        }
    });
})

export default router;

import multer from "multer"

let storage = multer.diskStorage({
    destination:(req,File,cb)=>{
        cb(null,File.originalname)
    },
    filename:(req,File,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage})
export default upload
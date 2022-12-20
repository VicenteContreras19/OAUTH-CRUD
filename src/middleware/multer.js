import multer from "multer";

const storage = multer.diskStorage({
    destiation: (req,res,done)=>{
    done(null,'public/assets')
}, 
filename: (req,res,done)=>{
    done(null,file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req,file,done)=>{
    const types = (".jpg", '.jpeg', '.png')
    
}})

export default upload
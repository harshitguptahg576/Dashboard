import express from 'express'
import multer from 'multer'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.static('public'));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/dp")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage}).single('profilePic')

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

app.listen(8000,()=>console.log("App is running on Port 8000"))
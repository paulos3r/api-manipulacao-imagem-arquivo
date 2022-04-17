import { Router  } from "express";
import multer from "multer";

import * as TodoController from '../controller/api.controller';
//salva dos arquivos temp no disco
const storageDiscConfig = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './tmp');
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + Date.now +'.jpg');
    }
});
//salva os arquivos temp somente na memoria
const storageMemoryConfig = multer({
    storage: multer.memoryStorage()
});

const uploud = multer({
    // storage: storageDiscConfig,
    dest:'./tmp',
    fileFilter:(req, file, cb)=>{
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        if(allowed.includes(file.mimetype)){
            cb(null, true)
        }else
            cb(null, false)
    },
    //mb_to_bytes site
    limits:{
        fieldSize: 1000000
    }
});

const router = Router();

router.post('/uploud/single',uploud.single('avatar'), TodoController.uploadFileSingle)

router.post('/uploud/array',uploud.array('avatars', 2), TodoController.uploadFileArray)

router.post('/uploud/fields',uploud.fields([
    {name: 'avatar', maxCount:1},
    {name: 'gallery', maxCount:2}
]), TodoController.uploadFileFields)




export default router;
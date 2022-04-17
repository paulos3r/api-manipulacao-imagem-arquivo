import { unlink } from 'fs/promises'
import { Request, Response } from "express";
import sharp from "sharp";

export const uploadFileSingle = async (req:Request, res: Response)=>{
    // 1 carrega a imagem 2 manipula 3 salva
    if(req.file){
        const filename = `${req.file.filename}.jpg`;
        //buffer se tiver na memoria e path quando esta no disco ..documentação do sharp
        await sharp(req.file.path)
        .resize(300, 300, {
            fit: sharp.fit.cover
        })
        .toFormat('jpeg')
        .toFile(`./public/media/${filename}`)

        await unlink(req.file.path);

        res.json({
            image: `${filename}`
        })
    }else{
        res.status(404);
        res.json({
            error: 'erro arquivo invalido'
        })
    }
}
export const uploadFileArray = async (req:Request, res: Response)=>{
    console.log(req.files)
    res.json({

    });
}
export const uploadFileFields = async (req:Request, res: Response)=>{
    // informa para typescript que vai receber um arquivo do tipo file do multer
    type UploudTypes = {
        avatar: Express.Multer.File[],
        gallery: Express.Multer.File[]
        //para situações mais genericas de recebimento de arquivo > [fieldname:string]: Express.Multer.File[]
    }
    const files = req.files as UploudTypes;
    console.log('AVATAR', files.avatar);
    console.log('GALLERY', files.gallery);

    res.json({

    });
}
import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import ApiRouter from './router/api';
import cors from 'cors';
import {MulterError} from 'multer'

dotenv.config();

const server = express();

server.use(cors({
    origin: '*'
}));
//resgatar json vindo do corpo da requisição
server.use(express.json())

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.use(ApiRouter);

server.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({
        error: 'Endpointer não encontrado.'
    });
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
    res.status(400); //Bad Request
    if(err instanceof MulterError){
        res.json({
            error: err.code
        })
    }else{
        console.log( err );
        res.json({
            error: 'Ocorreu algum error.'
        });
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);
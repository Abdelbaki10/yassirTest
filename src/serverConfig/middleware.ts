import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { NextFunction, Response,Request } from 'express';
import { DataSource } from 'typeorm';

export const middlewares = (app:any,appDataSource:DataSource) => {
  
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // passing dataSource object to all routes  
    app.use('/',(req:Request,res:Response,next:NextFunction)=>{
        req.body.connection = appDataSource
        next()
    })
  
  };
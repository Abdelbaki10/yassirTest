import { Request, Response } from "express";
import { MAKE_API_CALL } from "../../utils/helper";
import { API_KEY } from "../../routes/static/apikey";
import { getZoneAirQualityResponse } from "./weather.types";
import { ParisAirQ } from "../../entities/parisAirQ.entity";

class WeatherService {
    static async getZoneAirQuality(req:Request,res:Response){
        const {latitude,longitude} = req.query;
        const reqInfo = {
            url:`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`,
            method:'get'
        }
        try{
            const fetchRes = await MAKE_API_CALL(reqInfo);
            const returnedResult:getZoneAirQualityResponse = {
                Result:{pollution:{...fetchRes.data.data.current.pollution}}
            }
            res.status(200).send(returnedResult);
        }catch(error:any){
            if(error.code==='ENOTFOUND'){
                res.status(599).send({status:'failed',message:'Network Connect Timeout Error'})
            }else{
                res.send({status:'failed',message:'Failed to fetch info from airVisual api'})
            }
        }
    
    }

    static async getAndSaveParisAirQuality(req:Request,res:Response){
        const AppDataSource = req.body.connection
        const [latitude,longitude] = [48.856613,2.352222]
        const reqInfo = {
            url:`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`,
            method:'get'
        }
        try{
            const fetchRes = await MAKE_API_CALL(reqInfo);
            const parisAirInfo = AppDataSource.manager.create(ParisAirQ,{...fetchRes.data.data.current.pollution})
            await AppDataSource.manager.save(parisAirInfo);
        }catch(error:any){
            if(error.code==='ENOTFOUND'){
                res.status(599).send({status:'failed',message:'Network Connect Timeout Error'})
            }else{
                res.send({status:'failed',message:'Failed to save info'})
            }
        }
    
    }

    static async getMostPollutedParisAirQDates(req:Request,res:Response){
        const AppDataSource = req.body.connection
        try{
            const mostlyPoluted =  await AppDataSource.createQueryBuilder()
            .select()
            .from(ParisAirQ,'g')
            .where('g.aqius=(SELECT MAX(aqius) FROM public.paris_air_q)')
            .getRawMany()
            const result= mostlyPoluted.map((obj:any)=> {return {id:obj.id,aqius:obj.aqius,date:obj.createDate}})
            res.status(200).send({result})
            
        }catch(error:any){
            res.send({status:'failed',message:'Faild to retrieve data'})
        }
    
    }

}
export default WeatherService;
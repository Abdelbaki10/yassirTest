import { Request, Response } from "express";
import { MAKE_API_CALL } from "../utils/helper";
import { API_KEY } from "../routes/config/apikey";
import { getZoneAirQualityResponse } from "./types/weatherInfoTypes";

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
                res.status(599).send({status:'faild',message:'Network Connect Timeout Error'})
            }
        }
    
    }
}
export default WeatherService;
import { Request, Response } from "express";
import { MAKE_API_CALL } from "../../utils/helper";
import { API_KEY } from "../../routes/static/apikey";
import { getZoneAirQualityResponse, parisAirQ } from "./weather.types";
import { ParisAirQ } from "../../entities/parisAirQ.entity";
import { City } from "../../entities/city.entity";
import { CityPollutionRecds } from "../../entities/cityPollutionRecds.entity";

class WeatherService {
    
    static async getZoneAirQuality(req:Request,res:Response){
        const AppDataSource = req.body.connection
        const {latitude,longitude} = req.query;
        // checking params 
        const pattern = /^-?\d+(\.\d{1,})?$/
        const accOne = pattern.test(latitude as string)
        const accTow = pattern.test(longitude as string)
        if(accOne && accTow){
            const numVerLat = parseFloat(latitude as string)
            const numVerLog = parseFloat(longitude as string)
                if((numVerLat>=-90 && numVerLat<=90) && (numVerLog>=-180 && numVerLog<=180) ){
                    const reqInfo = {
                        url:`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`,
                        method:'get'
                    }
                    try{
                        const fetchRes = await MAKE_API_CALL(reqInfo);
                        const city:City = await AppDataSource.manager.findOne(City,{where:{name:fetchRes.data.data.city}});
                        let targetCity:City;
                        if(city){
                            targetCity=city
                        }else{
                            const cityInf = AppDataSource.manager.create(City,{
                                name:fetchRes.data.data.city,
                                state:fetchRes.data.data.state,
                                country:fetchRes.data.data.country})
                            targetCity = await AppDataSource.manager.save(cityInf)
                        }
                        // section to save information in DB
                        const records = AppDataSource.manager.create(CityPollutionRecds,
                            {...fetchRes.data.data.current.pollution,city:targetCity});
                        await AppDataSource.manager.save(records)
            
                        // section where we send back weather info to the client 
                        const returnedResult:getZoneAirQualityResponse = {
                            Result:{pollution:{...fetchRes.data.data.current.pollution}}
                        }
                        res.status(200).send(returnedResult);
                    }catch(error:any){
                        if(error.code==='ENOTFOUND'){
                            res.status(599).send({status:'failed',message:'Network Connect Timeout Error'})
                        }else{
                            res.status(500).send({status:'failed',message:'Failed to persiste DB data'})
                        }
                    }
                }else{
                    res.status(400).send({status:'failed',message:'params are not in their appropriate rangs'})
                }
        }else{
            res.status(400).send({status:'failed',message:'params are not in their appropriate type'})
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
            const savedWeatherInf:parisAirQ = await AppDataSource.manager.save(parisAirInfo);
            res.status(200).send(savedWeatherInf)
        }catch(error:any){
            if(error.code==='ENOTFOUND'){
                res.status(599).send({status:'failed',message:'Network Connect Timeout Error'})
            }else{
                res.status(500).send({status:'failed',message:'Failed to save info'})
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
            res.status(500).send({status:'failed',message:'Faild to retrieve data'})
        }
    
    }

}
export default WeatherService;
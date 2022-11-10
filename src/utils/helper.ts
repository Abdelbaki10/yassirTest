import axios from 'axios';


interface axiosConfig {
    url:string,
    method:string,
    data?:any
}
// axios config for making api requests 
export const MAKE_API_CALL = async (fetchUrl:axiosConfig)=>{
    const {url,method} = fetchUrl;
    let axiosReqParam = {};
    if(method === 'get'){
        axiosReqParam = {url,method};
    }else{
        axiosReqParam= {url,method,data:fetchUrl.data};
    }
    return await axios(axiosReqParam)
}

export const parisCronJob = ()=>{
    const reqInfo = {
      url:`http://localhost:5000/api/weather/getAndSaveParisAirQuality`,
      method:'get'
    }
    MAKE_API_CALL(reqInfo);
  }
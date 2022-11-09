export interface getZoneAirQualityResponse {
    Result:{
        pollution:{
            ts:string;
            aqius:number;
            mainus:string;
            aqinc:number;
            maincn:string;
        }
    }
}
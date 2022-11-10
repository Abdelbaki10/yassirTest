export interface PollutionInfo {
    ts:string;
    aqius:number;
    mainus:string;
    aqinc:number;
    maincn:string;
}
export interface getZoneAirQualityResponse {
    Result:{
        pollution:PollutionInfo
    }
}
export interface parisAirQ extends PollutionInfo{
    createDate: string
}
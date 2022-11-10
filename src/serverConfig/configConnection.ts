import { DataSource } from "typeorm";

interface connectionStrRes {
  appDataSource:DataSource,
  SERVERPORT:string
}

export async function getOrmconfigConnection(envConfigParam:string|undefined):Promise<connectionStrRes>{
    const ormConfig = await import(`./env/${envConfigParam}.json`);
    const SERVERPORT = ormConfig.PORT_SERVER;
    const appDataSource = new DataSource(ormConfig.ormconfig);
    return {appDataSource,SERVERPORT};
  }
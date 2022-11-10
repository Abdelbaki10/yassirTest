import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
import { City } from "./city.entity";
import { Pollution } from "./pollution";
  
  @Entity()
  export class CityPollutionRecds extends Pollution {
    @ManyToOne(()=>City,(city)=>city.pollutionRecds)
    city:City
  }
  
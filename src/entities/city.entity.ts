import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from "typeorm";
import { CityPollutionRecds } from "./cityPollutionRecds.entity";
  
  @Entity()
  export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    name:string;

    @Column({ type: "varchar" })
    state:string;

    @Column({ type: "varchar" })
    country:string;

    @OneToMany(()=>CityPollutionRecds,(pollution)=>pollution.city)
    pollutionRecds:CityPollutionRecds[]
  }
  
import {
    Entity,
    CreateDateColumn,
  } from "typeorm";
import { Pollution } from "./pollution";
  
  @Entity()
  export class ParisAirQ extends Pollution{
    @CreateDateColumn()
    createDate:Date;
  }
  
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class ParisAirQ {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    ts:string;

    @Column({ type: "integer" })
    aqius:number;

    @Column({ type: "varchar"})
    mainus:string;

    @Column({ type: "integer" })
    aqicn:number;

    @Column({ type: "varchar"})
    maincn:string;

    @CreateDateColumn()
    createDate:Date;
  }
  
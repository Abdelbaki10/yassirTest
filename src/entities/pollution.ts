import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from "typeorm";

  
  @Entity()
  export abstract class Pollution {
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
  }
  
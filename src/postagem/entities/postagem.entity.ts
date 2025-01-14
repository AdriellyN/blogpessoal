import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) // É o mesmo que fazer: CREATE TABLE tb_postagens()
export class Postagem{

    @PrimaryGeneratedColumn() // id: INT AUTO_INCREMENT PRIMARY KEY
    id: number;
    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 100, nullable: false}) // VARCHAR (100) NOT NULL
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 1000, nullable: false}) // VARCHAR (1000) NOT NULL
    texto: string;

    @UpdateDateColumn() // Atualiza automaticamente a data de alteração do objeto
    data: Date;

}
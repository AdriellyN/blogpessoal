import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) // É o mesmo que fazer: CREATE TABLE tb_postagens()
export class Postagem{

    @ApiProperty()  
    @PrimaryGeneratedColumn() // id: INT AUTO_INCREMENT PRIMARY KEY
    id: number;
    
    @ApiProperty()  
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 100, nullable: false}) // VARCHAR (100) NOT NULL
    titulo: string;

    @ApiProperty()  
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 1000, nullable: false}) // VARCHAR (1000) NOT NULL
    texto: string;

    @ApiProperty()  
    @UpdateDateColumn() // Atualiza automaticamente a data de alteração do objeto
    data: Date;

    @ApiProperty({ type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({ type: () => Tema })  
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem,{
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
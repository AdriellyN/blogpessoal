import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService{

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]>{
        return this.temaRepository.find({
            relations:{
                postagem: true
            }
        });  // SELECT * FROM tb_temas;
    }

    async findById(id: number): Promise<Tema>{
        // O await serve para esperar o retorno da busca em segundo plano, porque se não esperar ele vai tentar 
        // continuar a aplicação mesmo antes de ter um valor
        // SELECT * FROM tb_postagens WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations:{
                postagem: true
            }
        })

        if(!tema){
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)
        }
        return tema;
        
    }

    async findByDescricao(descricao: string): Promise<Tema[]>{
        return this.temaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`) // Insensitive Like - Ignora a sensitividade do banco e procura de forma insensitiva
            },
            relations:{
                postagem: true
            }
        });
    }

    async create(tema: Tema): Promise<Tema>{
        // INSERT INTO tb_postagens (titulo, texto) VALUES (x,y)
        return await this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema>{
        
        await this.findById(tema.id)

        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult>{

        await this.findById(id)

        //DELETE tb_temas WHERE id = ?;
        return await this.temaRepository.delete(id)
    }
}
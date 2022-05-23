import { ICreateDto, IUpdateDto } from "src/models";
import { DeleteResult } from "typeorm";

export interface IEntityService<T> {

  findAll(): Promise<T[]>;

  findOne(id: number): Promise<T>;

  create(createDto: ICreateDto<T>): Promise<T>;

  update(id: number, updateDto: IUpdateDto<T>): Promise<T>;

  remove(id: number): Promise<DeleteResult>;

}

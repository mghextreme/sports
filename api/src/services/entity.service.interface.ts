import { ICreateDto, IUpdateDto } from "src/models";

export interface IEntityService<T> {

  findAll(): Promise<T[]>;

  findOne(id: number): Promise<T | null>;

  create(createDto: ICreateDto): Promise<T>;

  update(updateDto: IUpdateDto): Promise<T>;

  remove(id: number): Promise<void>;

}

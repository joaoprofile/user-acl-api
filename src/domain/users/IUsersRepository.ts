import { IUserDTO } from "../dto/IUserDTO"

export interface IUsersRepository {
  findById(id: string): Promise<IUserDTO>
  findByEmail(email: string): Promise<IUserDTO>
  save(entity: IUserDTO): Promise<IUserDTO>
}
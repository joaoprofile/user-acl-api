import { ISignupDTO } from "../dto/ISignupDTO"
import { ITenantDTO } from "../dto/ITenantDTO"

export interface ITenantsRepository {
  findById(id: string): Promise<ITenantDTO>
  findByEmail(email: string): Promise<ITenantDTO>
  findByCpfCnpj(cpfCpj: string): Promise<ITenantDTO>
  save(entity: ITenantDTO): Promise<ITenantDTO>
}
export interface ITenantDTO {
  user: {
    name: string
    email: string
    password_hash: string
  },
  tenant: {
    name: string
    email: string
    cpf_cnpj: string
    cep: string
    address: string
    complement: string
    country: string
    city: string
    state: string
  },
  role: {
    id: string
    name: string
  }
}
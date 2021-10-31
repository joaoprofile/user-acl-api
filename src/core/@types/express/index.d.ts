declare namespace Express {
  export interface Request {
    user: {
      id: string
      tenant_id: string
      name: string
      email: string
    }
  }
}
export interface IAccessTokenResponseDTO {
  user: {
    name: string
    roles: string
  }
  token: string
}
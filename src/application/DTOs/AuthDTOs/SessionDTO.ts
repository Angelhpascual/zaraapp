export type UserRole = 'admin' | 'user'

export interface SessionDTO {
  token: string
  username: string
  role: UserRole
}

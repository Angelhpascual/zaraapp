import type { AuthRepository } from '../../application/ports/AuthRepository'
import { Session } from '../../domain/entities/Session'
import { httpClient } from './client'

const LOGIC_URL = 'https://fakestoreapi.com/auth/login'

interface LogicResponse {
  token: string
}

export class AuthHttpRepository implements AuthRepository {
  private session: Session | null = null

  async login(username: string, password: string): Promise<Session> {
    const response = await httpClient.post<LogicResponse>(LOGIC_URL, {
      username,
      password,
    })
    const session = Session.create({
      token: response.token,
      username,
      role: username === 'admin' ? 'admin' : 'user',
    })
    this.session = session
    return session
  }

  async logout(): Promise<void> {
    this.session = null
  }

  async getSession(): Promise<Session | null> {
    return this.session
  }
}

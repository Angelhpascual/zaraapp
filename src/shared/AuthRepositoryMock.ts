import type { Session } from '../domain/entities/Session'

export class AuthRepositoryMock {
  private readonly handler: (username: string, password: string) => Promise<Session>
  private session: Session | null = null
  constructor(
    handler: (username: string, password: string) => Promise<Session>,
  ) {
    this.handler = handler
  }

  async login(username: string, password: string): Promise<Session> {
    const session = await this.handler(username, password)
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

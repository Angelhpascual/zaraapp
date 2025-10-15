export interface SessionProps {
  token: string
  username: string
  role: 'admin' | 'user'
  expiresAt?: Date
}

export class Session {
  private readonly props: SessionProps

  private constructor(props: SessionProps) {
    this.props = props
  }

  static create(props: SessionProps): Session {
    if (!props.token.trim()) {
      throw new Error('Token is required')
    }
    if (!props.username.trim()) {
      throw new Error('Username is required')
    }
    return new Session(props)
  }

  isExpired(reference: Date = new Date()): boolean {
    if (!this.props.expiresAt)
      return false
    return this.props.expiresAt.getTime() <= reference.getTime()
  }

  refresh(token: string, expiresAt?: Date): Session {
    return Session.create({
      ...this.props,
      token,
      expiresAt,
    })
  }

  get token(): string {
    return this.props.token
  }

  get username(): string {
    return this.props.username
  }

  get role() {
    return this.props.role
  }

  get expiresAt() {
    return this.props.expiresAt
  }
}

import { describe, expect, it } from 'vitest'
import { Session } from '../Session'

describe('session', () => {
  it('should create a session with valid props', () => {
    const session = Session.create({
      token: 'valid-token',
      username: 'user1',
      role: 'user',
    })
    expect(session).toBeInstanceOf(Session)
    expect(session.token).toBe('valid-token')
    expect(session.username).toBe('user1')
    expect(session.role).toBe('user')
    expect(session.expiresAt).toBeUndefined()
  })

  it('should correctly identify expired sessions', () => {
    const pastDate = new Date(Date.now() - 1000 * 60) // 1 minute ago
    const futureDate = new Date(Date.now() + 1000 * 60) // 1 minute in the future

    const expiredSession = Session.create({
      token: 'expired-token',
      username: 'user1',
      role: 'user',
      expiresAt: pastDate,
    })
    expect(expiredSession.isExpired()).toBe(true)

    const validSession = Session.create({
      token: 'valid-token',
      username: 'user1',
      role: 'user',
      expiresAt: futureDate,
    })
    expect(validSession.isExpired()).toBe(false)

    // Test with custom reference date
    expect(validSession.isExpired(new Date(Date.now() + 2000 * 60))).toBe(true) // 2 minutes in the future
  })

  it('should refresh the session with a new token and optional expiry', () => {
    const originalSession = Session.create({
      token: 'original-token',
      username: 'user1',
      role: 'user',
    })

    const newExpiry = new Date(Date.now() + 1000 * 60 * 30) // 30 minutes in the future
    const refreshedSession = originalSession.refresh('new-token', newExpiry)

    expect(refreshedSession).toBeInstanceOf(Session)
    expect(refreshedSession.token).toBe('new-token')
    expect(refreshedSession.username).toBe('user1')
    expect(refreshedSession.role).toBe('user')
    expect(refreshedSession.expiresAt).toBe(newExpiry)

    // Ensure original session remains unchanged
    expect(originalSession.token).toBe('original-token')
    expect(originalSession.expiresAt).toBeUndefined()
  })

  it('should throw an error if token is empty', () => {
    expect(() =>
      Session.create({
        token: '   ',
        username: 'user1',
        role: 'user',
      }),
    ).toThrow('Token is required')
  })

  it('should throw an error if username is empty', () => {
    expect(() =>
      Session.create({
        token: 'valid-token',
        username: '   ',
        role: 'user',
      }),
    ).toThrow('Username is required')
  })
})

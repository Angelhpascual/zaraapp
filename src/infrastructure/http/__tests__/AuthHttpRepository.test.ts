import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { AuthHttpRepository } from '../AuthHttpRepository'
import { server } from '../mocks/server'

interface LoginRequestBody {
  username: string
  password: string
}

describe('authHttpRepository', () => {
  it('should authenticate user', async () => {
    server.use(
      http.post(
        'https://fakestoreapi.com/auth/login',
        async ({ request }) => {
          const body = (await request.json()) as LoginRequestBody

          if (body.username !== 'mor_2314' || body.password !== '83r5^_') {
            return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
          }

          return HttpResponse.json({ token: 'fake-jwt-token' }, { status: 200 })
        },
      ),
    )

    const repository = new AuthHttpRepository()
    const session = await repository.login('mor_2314', '83r5^_')

    expect(session.token).toBe('fake-jwt-token')
    expect(session.username).toBe('mor_2314')
    expect(session.role).toBe('user')
  })
  it('throws when API returns 401', async () => {
    server.use(
      http.post('https://fakestoreapi.com/auth/login', async () => {
        return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }),
    )

    const repository = new AuthHttpRepository()

    await expect(repository.login('wrong_user', 'wrong_pass')).rejects.toThrow()
  })
})

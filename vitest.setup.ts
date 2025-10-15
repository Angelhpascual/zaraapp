import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './src/infrastructure/http/mocks/server'
import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

import "@testing-library/jest-dom/vitest"
import { server } from "./src/infrastructure/http/mocks/server"
import { afterAll, beforeAll, afterEach } from "vitest"

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

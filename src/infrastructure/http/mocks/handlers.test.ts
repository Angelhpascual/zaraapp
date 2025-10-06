import { describe, expect, it } from "vitest"

describe("Fake Store API mock", () => {
  it("Devuelve productos desde MSW", async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data[0].title).toBe("Camiseta Básica")
  })
})

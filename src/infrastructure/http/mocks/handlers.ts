import { http, HttpResponse } from "msw"

const mockProducts = [
  {
    id: 1,
    title: "Camiseta Básica",
    price: 19.99,
    description: "Algodón 100%",
    category: "Men's Clothing",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.2, count: 87 },
  },
]

type LoginPayload = {
  username: string
  password: string
}

export const handlers = [
  http.get("https://fakestoreapi.com/products", () => {
    return HttpResponse.json(mockProducts)
  }),
  http.get("https://fakestoreapi.com/products/:id", ({ params }) => {
    const product = mockProducts.find((p) => p.id === Number(params.id))

    if (!product) {
      return new HttpResponse("Not Found", { status: 404 })
    }

    return HttpResponse.json(product)
  }),

  http.post("https://fakestoreapi.com/auth/login", async ({ request }) => {
    const { username, password } = (await request.json()) as LoginPayload

    if (username === "admin" && password === "1234") {
      return HttpResponse.json({ token: "fake_token" })
    }
    return new HttpResponse("Unauthorized", { status: 401 })
  }),
]

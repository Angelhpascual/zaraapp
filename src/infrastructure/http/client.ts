export interface HttpClient {
  get: <T>(url: string) => Promise<T>
  post: <T>(url: string, body?: unknown) => Promise<T>
  put: <T>(url: string, body?: unknown) => Promise<T>
  delete: <T>(url: string) => Promise<T>
}

export const httpClient: HttpClient = {
  async get(url) {
    const response = await fetch(url, { method: 'GET' })
    return response.json()
  },

  async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    return response.json()
  },

  async put(url, body) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    return response.json()
  },

  async delete(url) {
    const response = await fetch(url, { method: 'DELETE' })
    return response.json()
  },
}

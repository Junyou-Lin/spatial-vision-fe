export const baseURL =
  'https://ebqr1n6jv6.execute-api.us-east-1.amazonaws.com/prod/api'

export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

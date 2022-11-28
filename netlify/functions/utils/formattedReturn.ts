export default function formattedReturn<T>(statusCode: number, body: T) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}

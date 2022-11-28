export default function formattedReturn(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}

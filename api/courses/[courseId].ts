import type { VercelRequest, VercelResponse } from '@vercel/node'

import deleteCourse from '../../vercel-server/helpers/deleteCourse'
import updateCourse from '../../vercel-server/helpers/updateCourse'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // * call appropriate helper function based on HTTP method
  switch (req.method) {
    case 'PUT':
      return updateCourse(req, res)
    case 'DELETE':
      return deleteCourse(req, res)
    default:
      return res.status(405).json({ error: 'Method is not supported' })
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node'

import getCourses from '../../vercel-server/helpers/getCourses'
import createCourse from '../../vercel-server/helpers/createCourse'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // * call appropriate helper function based on HTTP method
  switch (req.method) {
    case 'GET':
      return getCourses(req, res)
    case 'POST':
      return createCourse(req, res)
    default:
      return res.status(405).json({ error: 'Method is not supported' })
  }
}

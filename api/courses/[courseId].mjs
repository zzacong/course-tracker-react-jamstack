import deleteCourse from '../../lib/helpers/deleteCourse.mjs'
import updateCourse from '../../lib/helpers/updateCourse.mjs'

export default async function handler(req, res) {
  // * call appropriate helper function based on HTTP method
  switch (req.method) {
    case 'PUT':
      return await updateCourse(req, res)
    case 'DELETE':
      return await deleteCourse(req, res)
    default:
      return res.status(405).json({ error: 'Method is not supported' })
  }
}

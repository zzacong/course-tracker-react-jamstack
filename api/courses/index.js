import getCourses from '../../lib/helpers/getCourses'
import createCourse from '../../lib/helpers/createCourse'

export default async function handler(req, res) {
  // * call appropriate helper function based on HTTP method
  switch (req.method) {
    case 'GET':
      return await getCourses(req, res)
    case 'POST':
      return await createCourse(req, res)
    default:
      return res.status(405).json({ error: 'Method is not supported' })
  }
}

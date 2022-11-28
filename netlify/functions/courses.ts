import type { Handler } from '@netlify/functions'

import formattedReturn from './utils/formattedReturn'
import getCourses from './routes/getCourses'
import createCourse from './routes/createCourse'
import deleteCourse from './routes/deleteCourse'
import updateCourse from './routes/updateCourse'

export const handler: Handler = async (event, context) => {
  const path = event.path.replace(/api\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  // * call appropriate helper function based on HTTP method
  switch (event.httpMethod) {
    case 'GET':
      return getCourses(event, context)
    case 'POST':
      return createCourse(event, context)
    case 'PUT':
      return updateCourse(event, context, segments[0]!)
    case 'DELETE':
      return deleteCourse(event, context, segments[0]!)
    default:
      return formattedReturn(405, { msg: 'Method is not supported' })
  }
}

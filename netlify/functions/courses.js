import formattedReturn from './utils/formattedReturn'
import getCourses from './routes/getCourses'
import createCourse from './routes/createCourse'
import deleteCourse from './routes/deleteCourse'
import updateCourse from './routes/updateCourse'

export async function handler(event) {
  // * call appropriate helper function based on HTTP method
  switch (event.httpMethod) {
    case 'GET':
      return await getCourses(event)
    case 'POST':
      return await createCourse(event)
    case 'PUT':
      return await updateCourse(event)
    case 'DELETE':
      return await deleteCourse(event)
    default:
      return formattedReturn(405, { msg: 'Method is not supported' })
  }
}

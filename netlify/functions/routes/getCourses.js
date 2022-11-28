import { table } from '../utils/airtable'
import formattedReturn from '../utils/formattedReturn'

export default async function handler(event) {
  // * get courses
  try {
    const courses = await table.select().firstPage()
    const formattedCourses = courses.map(course => ({
      id: course.id,
      ...course.fields,
    }))
    return formattedReturn(200, formattedCourses)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

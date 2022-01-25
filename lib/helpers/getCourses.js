import table from './airtable'

export default async function getCourses(_req, res) {
  // * get courses
  try {
    const courses = await table.select().firstPage()
    const formattedCourses = courses.map(course => ({
      id: course.id,
      ...course.fields,
    }))
    return res.status(200).json(formattedCourses)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

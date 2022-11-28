import type { VercelApiHandler } from '@vercel/node'

import table from './airtable'

const getCourses: VercelApiHandler = async (_req, res) => {
  // * get courses
  try {
    const courses = await table.select().firstPage()
    const formattedCourses = courses.map(course => ({
      id: course.id,
      ...course.fields,
    }))
    res.status(200).json(formattedCourses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default getCourses

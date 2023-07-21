import type { VercelRequest, VercelResponse } from '@vercel/node'

import { table } from '../_airtable.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const courses = await table.select().firstPage()
        const formattedCourses = courses.map(course => ({
          id: course.id,
          ...course.fields,
        }))
        res.json(formattedCourses)
        return
      case 'POST':
        const [createdCourse] = await table.create([{ fields: req.body }])
        res.status(201).json({ id: createdCourse.id, ...createdCourse.fields })
        return
    }
    res.status(405).json({ error: 'Method is not supported' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

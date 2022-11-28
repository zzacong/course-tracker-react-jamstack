import type { VercelApiHandler } from '@vercel/node'

import table from './airtable'

const updateCourse: VercelApiHandler = async (req, res) => {
  // * update course
  try {
    const courseId = req.query.courseId as string
    const updatedCourse = await table.update([
      { id: courseId, fields: req.body },
    ])
    res.status(200).json(updatedCourse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default updateCourse

import type { VercelApiHandler } from '@vercel/node'

import table from './airtable'

const deleteCourse: VercelApiHandler = async (req, res) => {
  // * delete course
  try {
    const courseId = req.query.courseId as string
    const deletedRecord = await table.destroy(courseId)
    res.status(200).json(deletedRecord)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default deleteCourse

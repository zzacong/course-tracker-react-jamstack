import type { VercelRequest, VercelResponse } from '@vercel/node'

import { table } from '../_airtable'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const courseId = req.query.courseId as string
    switch (req.method) {
      case 'PUT':
        const updatedCourse = await table.update([
          { id: courseId, fields: req.body },
        ])
        res.status(200).json(updatedCourse)
      case 'DELETE':
        const deletedRecord = await table.destroy(courseId)
        res.status(200).json(deletedRecord)
      default:
        return res.status(405).json({ error: 'Method is not supported' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

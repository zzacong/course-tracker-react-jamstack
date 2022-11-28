import type { VercelApiHandler } from '@vercel/node'

import table from './airtable'

const createCourse: VercelApiHandler = async (req, res) => {
  // * create course
  try {
    const createdCourse = await table.create([{ fields: req.body }])
    res.status(201).json(createdCourse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default createCourse

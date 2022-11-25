import table from './airtable.mjs'

export default async function createCourse(req, res) {
  // * create course
  try {
    const createdCourse = await table.create([{ fields: req.body }])
    return res.status(201).json(createdCourse)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

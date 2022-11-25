import table from './airtable.mjs'

export default async function updateCourse(req, res) {
  // * update course
  try {
    const { courseId } = req.query
    const updatedCourse = await table.update([
      { id: courseId, fields: req.body },
    ])
    return res.status(200).json(updatedCourse)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

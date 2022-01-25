import table from './airtable'

export default async function deleteCourse(req, res) {
  // * delete course
  try {
    const { courseId } = req.query
    const deletedRecord = await table.destroy(courseId)
    return res.status(200).json(deletedRecord)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

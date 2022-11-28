import { table } from '../utils/airtable'
import formattedReturn from '../utils/formattedReturn'

export default async function handler(event) {
  // * update course
  try {
    const { id, ...fields } = JSON.parse(event.body)
    const updatedCourse = await table.update([{ id, fields }])
    return formattedReturn(200, updatedCourse)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

import { table } from '../utils/airtable'
import formattedReturn from '../utils/formattedReturn'

export default async function handler(event) {
  // * delete course
  try {
    const { id } = JSON.parse(event.body)
    const deletedRecord = await table.destroy(id)
    return formattedReturn(200, deletedRecord)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

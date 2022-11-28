import type { HandlerEvent, HandlerContext } from '@netlify/functions'

import { table } from '../utils/airtable'
import formattedReturn from '../utils/formattedReturn'

export default async function handler(
  event: HandlerEvent,
  context: HandlerContext,
  id: string
) {
  // * delete course
  try {
    const deletedRecord = await table.destroy(id)
    return formattedReturn(200, deletedRecord)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

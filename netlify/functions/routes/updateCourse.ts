import type { HandlerEvent, HandlerContext } from '@netlify/functions'

import { table } from '../utils/airtable'
import formattedReturn from '../utils/formattedReturn'

export default async function handler(
  event: HandlerEvent,
  context: HandlerContext,
  id: string
) {
  // * update course
  try {
    const fields = event.body ? JSON.parse(event.body) : {}
    const updatedCourse = await table.update([{ id, fields }])
    return formattedReturn(200, updatedCourse)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

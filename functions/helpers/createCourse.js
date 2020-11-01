const { table } = require('./airtable')
const formattedReturn = require('./formattedReturn')
module.exports = async event => {
  // * create course
  try {
    const fields = JSON.parse(event.body)
    const createdCourse = await table.create([{ fields }])
    return formattedReturn(201, createdCourse)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

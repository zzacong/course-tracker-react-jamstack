const { table } = require('./airtable')
const formattedReturn = require('./formattedReturn')

module.exports = async event => {
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

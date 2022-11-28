const { table } = require('./airtable')
const formattedReturn = require('./formattedReturn')

module.exports = async event => {
  // * get courses
  try {
    const courses = await table.select().firstPage()
    const formattedCourses = courses.map(course => ({
      id: course.id,
      ...course.fields,
    }))
    return formattedReturn(200, formattedCourses)
  } catch (error) {
    console.error(error)
    return formattedReturn(500, { msg: 'Something went wrong' })
  }
}

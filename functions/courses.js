const formattedReturn = require('./helpers/formattedReturn')
const getCourses = require('./helpers/getCourses')
const createCourse = require('./helpers/createCourse')
const deleteCourse = require('./helpers/deleteCourse')
const updateCourse = require('./helpers/updateCourse')

exports.handler = async event => {
  // * call appropriate helper function based on HTTP method
  switch (event.httpMethod) {
    case 'GET':
      return await getCourses(event)
    case 'POST':
      return await createCourse(event)
    case 'PUT':
      return await updateCourse(event)
    case 'DELETE':
      return await deleteCourse(event)
    default:
      return formattedReturn(405, { msg: 'Method is not supported' })
  }
}

const formattedReturn = require('../../server/formattedReturn')
const getCourses = require('../../server/getCourses')
const createCourse = require('../../server/createCourse')
const deleteCourse = require('../../server/deleteCourse')
const updateCourse = require('../../server/updateCourse')

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

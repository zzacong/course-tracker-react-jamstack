import axios from 'axios'

export default function Course({ course, refreshCourses }) {
  const markCoursePurchased = async () => {
    // * mark course as purchased
    try {
      await axios.put(`/api/courses/${course.id}`, {
        purchased: true,
      })
      refreshCourses()
    } catch (error) {
      console.error(error)
    }
  }

  const markCourseUnpurchased = async () => {
    // * mark course as unpurchased
    try {
      await axios.put(`/api/courses/${course.id}`, {
        purchased: false,
      })
      refreshCourses()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCourse = async () => {
    // * delete course
    try {
      await axios.delete(`/api/courses/${course.id}`)
      refreshCourses()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="list-group-item">
      <a href={course.link} target="_blank" rel="noopener noreferrer">
        <h4 className="list-group-item-heading">{course.name}</h4>
      </a>
      <p>
        Tags:{' '}
        {course.tags &&
          course.tags.map((tag, index) => (
            <span className="badge badge-primary mr-2" key={index}>
              {tag}
            </span>
          ))}
      </p>
      {!course.purchased ? (
        <button
          className="btn btn-sm btn-primary"
          onClick={markCoursePurchased}
        >
          Purchased
        </button>
      ) : (
        <button
          className="btn btn-sm btn-secondary"
          onClick={markCourseUnpurchased}
        >
          Move to Backlog
        </button>
      )}
      <button className="btn btn-sm btn-danger ml-2" onClick={deleteCourse}>
        Delete
      </button>
    </div>
  )
}

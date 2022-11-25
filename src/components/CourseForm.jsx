import { useState } from 'react'
import axios from 'axios'

import Tags from './Tags'

export default function CourseForm({ courseAdded }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [tags, setTags] = useState([])
  const [count, setCount] = useState(0)

  const resetForm = () => {
    setName('')
    setLink('')
    setCount(count + 1)
  }

  const submitCourse = async e => {
    e.preventDefault()
    // * Create the course
    try {
      await axios.post('/api/courses', {
        name,
        link,
        tags,
      })
      resetForm()
      courseAdded()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card">
      <div className="card-header">Add a New Course</div>
      <div className="card-body">
        <form className="" onSubmit={submitCourse}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="link"
              value={link}
              className="form-control"
              onChange={e => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <p>Tags</p>
            <Tags tagsUpdated={setTags} keys={count} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

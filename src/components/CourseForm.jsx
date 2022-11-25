import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { queryKey } from '../App'
import Tags from './Tags'

const addCourse = async ({ name, link, tags }) => {
  try {
    await axios.post('/api/courses', {
      name,
      link,
      tags,
    })
  } catch (error) {
    console.error(error)
  }
}

export default function CourseForm() {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [tags, setTags] = useState([])
  const [count, setCount] = useState(0)

  const formRef = useRef(null)

  const queryClient = useQueryClient()
  const addCourseMutation = useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const resetForm = () => {
    setName('')
    setLink('')
    setCount(p => p + 1)
  }

  const submitCourse = e => {
    e.preventDefault()
    // * Create the course
    addCourseMutation.mutate({ name, link, tags })
    formRef.current.reset()
    resetForm()
  }

  return (
    <div className="card">
      <div className="card-header">Add a New Course</div>
      <div className="card-body">
        <form ref={formRef} className="" onSubmit={submitCourse}>
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
          <button
            type="submit"
            disabled={addCourseMutation.isLoading}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

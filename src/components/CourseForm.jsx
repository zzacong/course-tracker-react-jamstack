import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { queryKey } from '../App'
import Tags from './Tags'

const addCourse = async ({ name, link, tags }) => {
  const { data } = await axios.post('/api/courses', {
    name,
    link,
    tags,
  })
  return data
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

    // When mutate is called:
    onMutate: async newCourse => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [queryKey] })
      // Snapshot the previous value
      const previousCourses = queryClient.getQueryData([queryKey])
      // Optimistically update to the new value
      const newCourseWithFields = {
        ...newCourse,
        id: Date.now(),
        purchased: false,
      }
      queryClient.setQueryData([queryKey], old => [newCourseWithFields, ...old])
      // Return a context object with the snapshotted value
      return { previousCourses }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      queryClient.setQueryData([queryKey], context.previousCourses)
    },
    // Always refetch after error or success:
    onSettled: _newCourse => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
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
            <Tags tagsUpdated={setTags} count={count} />
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

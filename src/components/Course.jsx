import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { queryKey } from '../App'

const markCoursePurchased = async ({ courseId, purchased }) => {
  // * mark course as purchased
  try {
    await axios.put(`/api/courses/${courseId}`, {
      purchased,
    })
  } catch (error) {
    console.error(error)
  }
}

const deleteCourse = async courseId => {
  // * delete course
  try {
    await axios.delete(`/api/courses/${courseId}`)
  } catch (error) {
    console.error(error)
  }
}

export default function Course({ course }) {
  const queryClient = useQueryClient()

  const markCoursePurchasedMutation = useMutation({
    mutationFn: markCoursePurchased,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

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
          disabled={
            markCoursePurchasedMutation.isLoading ||
            deleteCourseMutation.isLoading
          }
          onClick={() =>
            markCoursePurchasedMutation.mutate({
              courseId: course.id,
              purchased: true,
            })
          }
        >
          Purchased
        </button>
      ) : (
        <button
          className="btn btn-sm btn-secondary"
          disabled={
            markCoursePurchasedMutation.isLoading ||
            deleteCourseMutation.isLoading
          }
          onClick={() =>
            markCoursePurchasedMutation.mutate({
              courseId: course.id,
              purchased: false,
            })
          }
        >
          Move to Backlog
        </button>
      )}
      <button
        className="btn btn-sm btn-danger ml-2"
        disabled={
          deleteCourseMutation.isLoading ||
          markCoursePurchasedMutation.isLoading
        }
        onClick={() => deleteCourseMutation.mutate(course.id)}
      >
        Delete
      </button>
    </div>
  )
}

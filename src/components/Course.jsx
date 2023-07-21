import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { queryKey } from '../App'

const markCoursePurchased = ({ id, purchased }) =>
  axios.put(`/api/courses/${id}`, {
    purchased,
  })

const deleteCourse = courseId => axios.delete(`/api/courses/${courseId}`)

export default function Course({ course }) {
  const queryClient = useQueryClient()

  const markCoursePurchasedMutation = useMutation({
    mutationFn: markCoursePurchased,
    // When mutate is called:
    onMutate: async updatedCourse => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [queryKey] })
      // Snapshot the previous value
      const previousCourses = queryClient.getQueryData([queryKey])
      // Optimistically update to the new value
      queryClient.setQueryData([queryKey], old =>
        old.map(o => {
          if (o.id === updatedCourse.id) return updatedCourse
          return o
        })
      )
      // Return a context object with the snapshotted value
      return { previousCourses }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      queryClient.setQueryData([queryKey], context.previousCourses)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: [queryKey] })
      const previousCourses = queryClient.getQueryData([queryKey])
      queryClient.setQueryData([queryKey], old => old.filter(o => o.id !== id))
      return { previousCourses }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([queryKey], context.previousCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
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
              ...course,
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
              ...course,
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

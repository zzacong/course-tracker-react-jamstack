import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import CourseList from './components/CourseList'
import CourseForm from './components/CourseForm'

const loadCourses = async () => {
  // * load the courses
  const { data: courses } = await axios.get('/api/courses')
  return courses
}

export const queryKey = 'get-courses'

function App() {
  const { data: courses } = useQuery({
    queryKey: [queryKey],
    queryFn: loadCourses,
    initialData: [],
    // refetchOnWindowFocus: false,
  })

  return (
    <div className="container my-5">
      <h1 className="mb-5 text-center">Course Tracker</h1>
      <CourseForm />
      <CourseList courses={courses} />
    </div>
  )
}

export default App

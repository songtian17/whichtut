import { useState } from 'react'
import './App.css'
import CourseTag from './CourseTag'
import TimeTable from './Timetable'

function App() {
  const [semester] = useState("Acad Yr 2023 Semester 2")
  const [inputValue, setInputValue] = useState("")
  const [courseList, setCourseList] = useState(localStorage.getItem("courseList") ? JSON.parse(localStorage.getItem("courseList")) : []);
  const [scheduleData, setScheduleData] = useState([])
  function handleTextInputKeyUp(e) {
    if (e.key === "Enter") {
      const newCourseList = [...courseList, inputValue]
      setCourseList(newCourseList)
      setInputValue("")
      localStorage.setItem("courseList", JSON.stringify(newCourseList))
    }
  }

  function removeCourseTag(index) {
    const removedCourse = courseList[index];
    const newCourseList = courseList.filter((_, i) => i !== index);
    setCourseList(newCourseList);
    localStorage.setItem("courseList", JSON.stringify(newCourseList))

    removeCourseData(removedCourse)
  }

  function removeCourseData(courseCode) {
    setScheduleData(scheduleData => scheduleData.filter(schedule => schedule.courseCode !== courseCode))
  }

  function handleCourseDataFetched(courseData) {
    setScheduleData(scheduleData => [...scheduleData, courseData])
  }

  return (
    <>
    <h2>{semester}</h2>
      <input value={inputValue} type="text" name="search" id="search" onKeyUp={e => {handleTextInputKeyUp(e)}} onChange={e => {setInputValue(e.target.value)}}/>
      {
        courseList.map((courseCode, index) => (
          <CourseTag key={index} courseCode={courseCode} semester={semester} onClick={() => removeCourseTag(index)} fetchDataHandler={handleCourseDataFetched} removeCourseData={removeCourseData}></CourseTag>
        ))
      }
    <TimeTable schedule={scheduleData}></TimeTable>
    </>
  )
}

export default App

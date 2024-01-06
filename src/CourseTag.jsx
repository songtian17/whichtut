import { useState, useEffect } from "react"
import { ring } from "ldrs"
import "./CourseTag.css"
import { Icon } from '@iconify/react';

function CourseTag({courseCode, semester, onClick, fetchDataHandler, removeCourseData}) {
    const [loading, setLoading] = useState(false)
    ring.register()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const fetchCourseData = async () => {
            const url = "http://localhost:3000?" + new URLSearchParams({
                semester: semester,
                courseCode: courseCode
            })
            if (localStorage.getItem(url)) {
                fetchDataHandler(JSON.parse(localStorage.getItem(url)))
                setLoading(false)
            } else {
                fetch(url, {
                    method: "GET",
                    signal: signal
                }).then(async (response) => {
                    if (response.status === 200) {
                        const data = await response.json()
                        setLoading(false)
                        data['courseCode'] = courseCode
                        fetchDataHandler(data)
                        localStorage.setItem(url, JSON.stringify(data))
                    }
                }).catch((error) => {
                    console.error(error)
                })
            }            
        }

        if (semester && courseCode) {
            // shouldFetch.current = false
            setLoading(true)
            fetchCourseData()
        }
        
        return () => {
            controller.abort()
            removeCourseData(courseCode)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semester, courseCode])    

    return (
        <button className="courseTag" onClick={onClick}>
            {courseCode}
            {loading && <l-ring
            size="16"
            stroke="3"
            bg-opacity="0"
            speed="2" 
            color="white" 
            ></l-ring>}
            <Icon icon="material-symbols:close" className="closeIcon"></Icon>
        </button>
    )
}

export default CourseTag
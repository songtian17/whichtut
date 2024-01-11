import { useEffect, useState } from "react"
import "./TimeTable.css"

function DataRow({time, tutorials}) {
    return (
        <>
        {tutorials &&
            <tr>
                <td>{time}</td>
                <td>{tutorials['MON'] ? tutorials['MON'].map((tutorial, index) => (<span key={index}>{`${tutorial.venue} - ${tutorial.courseCode}`}</span>)) : ''}</td>
                <td>{tutorials['TUE'] ? tutorials['TUE'].map((tutorial, index) => (<span key={index}>{`${tutorial.venue} - ${tutorial.courseCode}`}</span>)) : ''}</td>
                <td>{tutorials['WED'] ? tutorials['WED'].map((tutorial, index) => (<span key={index}>{`${tutorial.venue} - ${tutorial.courseCode}`}</span>)) : ''}</td>
                <td>{tutorials['THU'] ? tutorials['THU'].map((tutorial, index) => (<span key={index}>{`${tutorial.venue} - ${tutorial.courseCode}`}</span>)) : ''}</td>
                <td>{tutorials['FRI'] ? tutorials['FRI'].map((tutorial, index) => (<span key={index}>{`${tutorial.venue} - ${tutorial.courseCode}`}</span>)) : ''}</td>
            </tr>
        }
        </>
    )
}

function TimeTable({schedule}) {
    const [timeDict, setTimeDict] = useState({})

    useEffect(() => {
        const newTimeDict = {};

        schedule.forEach(course => {
            course.tutorials.forEach(tutorial => {
                if (!newTimeDict[tutorial.time]) {
                    newTimeDict[tutorial.time] = {};
                }
                if (!newTimeDict[tutorial.time][tutorial.day]) {
                    newTimeDict[tutorial.time][tutorial.day] = [];
                }
                const updatedIndexClass = { ...tutorial, courseCode: course.courseCode };
                newTimeDict[tutorial.time][tutorial.day].push(updatedIndexClass);
            });
        });

        setTimeDict(prevTimeDict => {
            const mergedTimeDict = { ...prevTimeDict, ...newTimeDict };
            const sortedTimeDict = Object.keys(mergedTimeDict).sort().reduce((sorted, key) => {
                sorted[key] = newTimeDict[key]
                return sorted
            }, {})
            return sortedTimeDict;
        });
    }, [schedule]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(timeDict).map((time) => (
                        <DataRow key={time} time={time} tutorials={timeDict[time]}></DataRow>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TimeTable
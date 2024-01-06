import { useEffect, useState } from "react"
import "./TimeTable.css"

function DataRow({time, days}) {
    return (
        <>
        {days &&
            <tr>
                <td>{time}</td>
                <td>{days['MON'] ? days['MON'].map((day, index) => (<span key={index}>{`${day.venue} - ${day.courseCode}`}</span>)) : ''}</td>
                <td>{days['TUE'] ? days['TUE'].map((day, index) => (<span key={index}>{`${day.venue} - ${day.courseCode}`}</span>)) : ''}</td>
                <td>{days['WED'] ? days['WED'].map((day, index) => (<span key={index}>{`${day.venue} - ${day.courseCode}`}</span>)) : ''}</td>
                <td>{days['THU'] ? days['THU'].map((day, index) => (<span key={index}>{`${day.venue} - ${day.courseCode}`}</span>)) : ''}</td>
                <td>{days['FRI'] ? days['FRI'].map((day, index) => (<span key={index}>{`${day.venue} - ${day.courseCode}`}</span>)) : ''}</td>
            </tr>
        }
        </>
    )
}

function TimeTable({schedule}) {
    const [timeDict, setTimeDict] = useState({})

    useEffect(() => {
        const newTimeDict = {};
        console.log("schedule", schedule)

        schedule.forEach(course => {
            Object.values(course.indexes).forEach(indexClasses => {
                indexClasses.forEach(indexClass => {
                    if (indexClass.type === 'TUT') {
                        if (!newTimeDict[indexClass.time]) {
                            newTimeDict[indexClass.time] = {};
                        }
                        if (!newTimeDict[indexClass.time][indexClass.day]) {
                            newTimeDict[indexClass.time][indexClass.day] = [];
                        }
                        const updatedIndexClass = { ...indexClass, courseCode: course.courseCode };
                        newTimeDict[indexClass.time][indexClass.day].push(updatedIndexClass);
                    }
                });
            });
        });

        setTimeDict(prevTimeDict => {
            const mergedTimeDict = { ...prevTimeDict, ...newTimeDict };
            const sortedTimeDict = Object.keys(mergedTimeDict).sort().reduce((sorted, key) => {
                sorted[key] = newTimeDict[key]
                return sorted
            }, {})
            console.log("sortedTimeDict", sortedTimeDict)
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
                        <DataRow key={time} time={time} days={timeDict[time]}></DataRow>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TimeTable
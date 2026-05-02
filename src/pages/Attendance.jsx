<<<<<<< HEAD
import { useMemo, useState } from 'react'
=======
import { useEffect, useMemo, useState } from 'react'
>>>>>>> b24db39835b92663be3c54739ff453579757a15e
import { checkUser } from '../helpers'

const STUDENTS = [
  { id: 1, name: 'Aryan Sharma', grade: '9th Grade' },
  { id: 2, name: 'Neha Kapoor', grade: '9th Grade' },
  { id: 3, name: 'Manish Verma', grade: '9th Grade' },
  { id: 4, name: 'Priya Singh', grade: '9th Grade' },
]

<<<<<<< HEAD
=======
const getClassLabel = (classItem) => classItem?.name ?? classItem?.className ?? classItem?.label ?? 'Class'

>>>>>>> b24db39835b92663be3c54739ff453579757a15e
const formatDateLabel = (dateValue) => {
  if (!dateValue) {
    return ''
  }

  const parsed = new Date(`${dateValue}T00:00:00`)

  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const Attendance = () => {
  const user = checkUser()
  const role = user?.role?.toUpperCase() ?? 'TEACHER'
  const isParent = role === 'PARENT'

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10))
<<<<<<< HEAD
=======
  const [classes, setClasses] = useState([])
  const [selectedClassId, setSelectedClassId] = useState('')
  const [classLoadError, setClassLoadError] = useState('')
>>>>>>> b24db39835b92663be3c54739ff453579757a15e
  const [statusByStudent, setStatusByStudent] = useState(
    STUDENTS.reduce((acc, student) => ({ ...acc, [student.id]: 'PRESENT' }), {}),
  )
  const [submitStatus, setSubmitStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

<<<<<<< HEAD
=======
  useEffect(() => {
    if (isParent) {
      return
    }

    const fetchClasses = async () => {
      setClassLoadError('')

      try {
        const response = await fetch('http://localhost:8080/api/teacher/classes', {
          headers: {
            Authorization: user?.token ? `Bearer ${user.token}` : '',
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load classes')
        }

        const data = await response.json()
        const fetchedClasses = Array.isArray(data) ? data : []
        setClasses(fetchedClasses)

        if (fetchedClasses.length > 0) {
          setSelectedClassId(String(fetchedClasses[0].id))
        }
      } catch {
        setClassLoadError('Unable to load classes. Please refresh and try again.')
      }
    }

    fetchClasses()
  }, [isParent, user?.token])

>>>>>>> b24db39835b92663be3c54739ff453579757a15e
  const presentCount = useMemo(
    () => Object.values(statusByStudent).filter((status) => status === 'PRESENT').length,
    [statusByStudent],
  )

  const absentCount = STUDENTS.length - presentCount

  const updateStatus = (studentId, status) => {
    setStatusByStudent((current) => ({
      ...current,
      [studentId]: status,
    }))
  }

  const handleSubmitAttendance = async () => {
<<<<<<< HEAD
=======
    if (!selectedClassId) {
      setSubmitStatus('Please select a class before submitting attendance.')
      return
    }

    const teacherId = Number(localStorage.getItem('teacherId'))

    if (!Number.isFinite(teacherId)) {
      setSubmitStatus('Teacher ID is missing. Please login again.')
      return
    }

>>>>>>> b24db39835b92663be3c54739ff453579757a15e
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
<<<<<<< HEAD
      const payload = {
        className: '9th Grade - Section A',
        date: selectedDate,
        attendance: STUDENTS.map((student) => ({
          studentId: student.id,
          studentName: student.name,
          status: statusByStudent[student.id],
        })),
      }

      const response = await fetch('http://localhost:8080/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Unable to save attendance.')
      }
=======
      const payloads = STUDENTS.map((student) => ({
        date: selectedDate,
        status: statusByStudent[student.id],
        studentId: student.id,
        classId: Number(selectedClassId),
        teacherId,
      }))

      await Promise.all(
        payloads.map(async (payload) => {
          const response = await fetch('http://localhost:8080/api/attendance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: user?.token ? `Bearer ${user.token}` : '',
            },
            body: JSON.stringify(payload),
          })

          if (!response.ok) {
            throw new Error('Unable to save attendance.')
          }
        }),
      )
>>>>>>> b24db39835b92663be3c54739ff453579757a15e

      setSubmitStatus('Attendance submitted and saved successfully.')
    } catch {
      setSubmitStatus('Failed to save attendance. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isParent) {
    return (
      <section className="page-card">
        <h1>Child Attendance</h1>
        <p>
          Parent accounts can view child attendance only. Mark attendance is available for teacher
          accounts.
        </p>
      </section>
    )
  }

  return (
    <section className="page-card attendance-page">
      <h1>Mark Attendance</h1>

      <div className="attendance-page__filters">
        <div>
          <label htmlFor="attendance-date">Date</label>
          <input
            id="attendance-date"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </div>
        <div>
<<<<<<< HEAD
          <span>Class</span>
          <strong>9th Grade - Section A</strong>
        </div>
      </div>

=======
          <label htmlFor="attendance-class">Class</label>
          <select
            id="attendance-class"
            value={selectedClassId}
            onChange={(event) => setSelectedClassId(event.target.value)}
          >
            <option value="">Select class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {getClassLabel(classItem)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {classLoadError && <p className="attendance-page__status">{classLoadError}</p>}
>>>>>>> b24db39835b92663be3c54739ff453579757a15e
      <p className="attendance-page__meta">{formatDateLabel(selectedDate)}</p>
      <p className="attendance-page__meta">Present: {presentCount} | Absent: {absentCount}</p>

      <div className="attendance-page__list">
        {STUDENTS.map((student) => {
          const studentStatus = statusByStudent[student.id]
          return (
            <article className="attendance-row" key={student.id}>
              <div>
                <h2>{student.name}</h2>
                <p>{student.grade}</p>
              </div>
              <div className="attendance-row__actions">
                <button
                  type="button"
                  className={studentStatus === 'PRESENT' ? 'active-present' : ''}
                  onClick={() => updateStatus(student.id, 'PRESENT')}
                >
                  Present
                </button>
                <button
                  type="button"
                  className={studentStatus === 'ABSENT' ? 'active-absent' : ''}
                  onClick={() => updateStatus(student.id, 'ABSENT')}
                >
                  Absent
                </button>
              </div>
            </article>
          )
        })}
      </div>

<<<<<<< HEAD
      <button type="button" onClick={handleSubmitAttendance} disabled={isSubmitting}>
=======
      <button type="button" onClick={handleSubmitAttendance} disabled={isSubmitting || !classes.length}>
>>>>>>> b24db39835b92663be3c54739ff453579757a15e
        {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
      </button>

      {submitStatus && <p className="attendance-page__status">{submitStatus}</p>}
    </section>
  )
}

export default Attendance

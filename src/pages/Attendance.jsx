import { useMemo, useState } from 'react'
import { checkUser } from '../helpers'

const STUDENTS = [
  { id: 1, name: 'Aryan Sharma', grade: '9th Grade' },
  { id: 2, name: 'Neha Kapoor', grade: '9th Grade' },
  { id: 3, name: 'Manish Verma', grade: '9th Grade' },
  { id: 4, name: 'Priya Singh', grade: '9th Grade' },
]

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
  const [statusByStudent, setStatusByStudent] = useState(
    STUDENTS.reduce((acc, student) => ({ ...acc, [student.id]: 'PRESENT' }), {}),
  )
  const [submitStatus, setSubmitStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
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
          <span>Class</span>
          <strong>9th Grade - Section A</strong>
        </div>
      </div>

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

      <button type="button" onClick={handleSubmitAttendance} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
      </button>

      {submitStatus && <p className="attendance-page__status">{submitStatus}</p>}
    </section>
  )
}

export default Attendance

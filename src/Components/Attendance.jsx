import React, { useEffect } from 'react'
import { checkUser } from '../helpers'

const Attendance = () => {

  useEffect(() => {
    if(checkUser() === null){
      console.log(checkUser());
      window.location.href = '/login';
    }
  }, [])

  return (
    <div>Attendance</div>
  )
}

export default Attendance
import React from 'react'
import { useSelector } from 'react-redux'

const AppointmentConfirmation = () => {

  const {user} = useSelector((state)=>state.auth);
  
  return (
    <div>

    </div>
  )
}

export default AppointmentConfirmation
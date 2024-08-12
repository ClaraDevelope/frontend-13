import React from 'react'
import Personal from '../../components/Personal/Personal'
import { useAuth } from '../../providers/AuthProvider'

const Profile = () => {
const {user} = useAuth()
  console.log(user);
  
  return (
    <div className='profile'>
      <Personal user={user} />
    </div>
  )
}

export default Profile

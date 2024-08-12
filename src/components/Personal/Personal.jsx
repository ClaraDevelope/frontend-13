import React from 'react'
import './Personal.css'

const Personal = ({user}) => {

  return (
    <div>
      <h3>Hola de nuevo {user.profile.name}</h3>
      <div>
        <img src={user.profile.img} alt="avatar" className='avatar'/>
      </div>
      <span>{user.profile.email}</span>
    </div>
  )
}

export default Personal

import React from 'react';
import Wellcome from '../../components/Wellcome/Wellcome';
import { useAuth } from '../../providers/AuthProvider';
import Personal from '../../components/Personal/Personal';
import './Profile.css';
import MenstrualProfile from '../../components/MenstrualProfile/MenstrualProfile';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className='profile-grid'>
      <Wellcome user={user} />
      <Personal user={user} />
      <MenstrualProfile user={user} />
    </div>
  );
}

export default Profile;



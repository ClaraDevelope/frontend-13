import React from 'react';
import { Link } from 'react-router-dom';

const TitleAndLogo = ({ to }) => (
  <div className='title'>
    <Link to={to}>
      <h1 className='principal-title'>MenstruApp</h1>
      <img src="./luna.png" alt="logo-menstruApp" className='logo'/>
    </Link>
  </div>
);

export default TitleAndLogo;
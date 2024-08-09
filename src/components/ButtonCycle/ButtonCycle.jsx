import React from 'react';
import PropTypes from 'prop-types';
import './ButtonCycle.css';

const ButtonCycle = ({ status, onClick }) => {
  const buttonText = status === 'start' ? 'Inicio de la menstruación' : 'Fin de la menstruación';

  return (
    <button 
      className={`cycle-button ${status === 'start' ? 'start' : 'end'}`} 
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

ButtonCycle.propTypes = {
  status: PropTypes.oneOf(['start', 'end']).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonCycle;


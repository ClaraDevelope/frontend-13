import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react'

const CustomToolbar = ({ label, onNavigate }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
    <IconButton
      icon={<ChevronLeftIcon />}
      aria-label="Previous month"
      onClick={() => onNavigate('PREV')}
      style={{ marginRight: '20px' }}
    />
    <span style={{ flex: 1, textAlign: 'center',textTransform:'capitalize' }}>{label}</span>
    <IconButton
      icon={<ChevronRightIcon />}
      aria-label="Next month"
      onClick={() => onNavigate('NEXT')}
      style={{ marginLeft: '20px' }}
    />
  </div>
);
export default CustomToolbar

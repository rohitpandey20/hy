// src/components/TicketCard.js
import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  return (
    <div className='card'>
      <div className='idAndImageContainer'>
        <div className='idContainer'>{ticket.id}</div>
        <div className='imageContainer'>
          <img
            className='image'
            src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='images'
          />
          <div className='statusIndicator'></div>
        </div>
      </div>
      <div className='nameContainer'>{ticket.title}</div>
      <div className='featureRequestContainer'>
        <div className='featureRequestIconContainer'>
          <svg
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            fill='#6b6f76'
            className='bi bi-exclamation-square-fill'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
            </g>
          </svg>
        </div>
        <div className='featureRequestTextContainer'>
          <div className='featureRequestStatus'></div>
          <div className='featureRequestText'>Feature Request</div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;

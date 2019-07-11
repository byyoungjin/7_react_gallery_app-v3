import React from 'react';

const NotFound = ({location}) => {
  return (
    <li className="not-found">
      <h3>Not Found</h3>
      <p>No page for url: {location.pathname}</p>
    </li>
  )
}

export default NotFound;

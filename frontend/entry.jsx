import ReactDOM from 'react-dom';
import React from 'react';
import Search from './search';

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  ReactDOM.render(<Search />, search);
});

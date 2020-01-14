import React from 'react';

function Header(props) {
  return (
    <div className= 'p-3 col-12 bg-dark'>
      <div className='ml-5'>
        <i className='text-light fas fa-dollar-sign'></i>
        <h5 className='ml-2 d-inline-block text-light'>Wicked Sales</h5>
      </div>
    </div>
  );
}

export default Header;

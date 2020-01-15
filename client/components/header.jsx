import React from 'react';

function Header(props) {
  let item;
  if (props.cartItemCount === 1) {
    item = '1 Item';
  } else {
    item = `${props.cartItemCount} Items`;
  }

  function handleCartClick() {
    props.setView('cart', {});
  }

  return (
    <div className= 'p-3 col-12 bg-dark'>
      <div className='ml-5'>
        <i className='text-light fas fa-dollar-sign'></i>
        <h5 className='ml-2 d-inline text-light'>Wicked Sales</h5>
        <i className='text-light mt-1 mr-5 fas fa-shopping-cart float-right cursor-pointer' onClick={handleCartClick}></i>
        <p className='mr-2 d-inline text-light float-right'>{item}</p>

      </div>
    </div>
  );
}

export default Header;

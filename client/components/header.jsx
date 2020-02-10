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
    <div className= 'p-3 col-12 water-color-header'>
      <div className='ml-2 d-flex align-items-center justify-content-between'>
        <img className="logo" alt="Bujo Central" src="/images/logo.png"></img>
        <h5 className='mr-2 d-inline cursor-pointer' onClick={handleCartClick}> <i className='mt-1 mr-2 fas fa-shopping-cart cursor-pointer'></i>
          {item}</h5>
      </div>
    </div>
  );
}

export default Header;

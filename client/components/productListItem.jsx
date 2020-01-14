import React from 'react';

function ProductListItem(props) {
  const price = (props.price / 100).toFixed(2);
  return (
    <div className='card col-sm-12 col-md-3 col-xl-2 bg-white m-2'>
      <img className = 'img-card' src={props.image}></img>
      <div className= 'p-3'>
        <h5>{props.name}</h5>
        <p className= 'text-muted'>${price}</p>
        <p>{props.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;

import React from 'react';

function ProductListItem(props) {
  const price = (props.price / 100).toFixed(2);

  function handleClick() {
    props.setView('details', { productId: props.id });
  }
  return (
    <div className='card col-sm-12 col-md-3 bg-white m-2 cursor-pointer' onClick={handleClick}>
      <img className = 'mt-2 card-img-top img-card' src={props.image}></img>
      <div className= 'p-3 card-body'>
        <h5>{props.name}</h5>
        <p className= 'text-muted'>${price}</p>
        <p>{props.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;

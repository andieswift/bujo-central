import React from 'react';

function ProductListItem(props) {
  const price = (props.price / 100).toFixed(2);

  function handleClick() {
    props.setView('details', { productId: props.id });
  }
  return (
    <div className="col-lg-4 col-sm-12 col-md-6 p-2 ">
      <div className='card bg-white cursor-pointer list-item' onClick={handleClick}>
        <img className = 'mt-2 card-img-top img-card' src={'./images/' + props.image}></img>
        <div className= 'p-3 card-body'>
          <h5>{props.name}</h5>
          <p className= 'text-muted'>${price}</p>
          <p>{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;

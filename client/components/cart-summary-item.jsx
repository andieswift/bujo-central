import React from 'react';

function CartSummaryItem(props) {
  const price = (props.product.price / 100).toFixed(2);
  return (
    <div className="card m-2 ">
      <div className="row">
        <div className="col-md-3">
          <div className="imgAb5t img-cart">
            <img className='w-100 m-2' src={props.product.image}></img>
          </div>
        </div>
        <div className="col-md-8 mt-2">
          <h5>{props.product.name}</h5>
          <p className='text-muted'>${price}</p>
          <p>{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;

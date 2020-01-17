import React from 'react';

function CartSummaryItem(props) {
  const price = (props.product.price / 100).toFixed(2);
  function handleCancle() {
    props.deleteItem(props.product);
  }
  return (
    <div className="card m-2 p-2">
      <div className="row">
        <div className="col-md-3">
          <div className="imgAb5t img-cart">
            <img className='w-100 m-2' src={props.product.image}></img>
          </div>
        </div>
        <div className="col-md-9 mt-2">
          <h5 className="d-inline">{props.product.name}</h5>
          <i className="far fa-times-circle cursor-pointer float-right " onClick={handleCancle}></i>
          <p className='text-muted'>${price}</p>
          <p>{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;

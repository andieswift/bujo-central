import React from 'react';

function CartSummaryItem(props) {
  const price = (props.product.price / 100).toFixed(2);
  function handleCancle() {
    props.deleteItem(props.product);
  }
  return (

    <div className="card container cart-container p-2 mb-3 col-12">
      <div className="d-flex justify-content-between">
        <h2>{props.product.name} </h2>
        <i className="far fa-times-circle cursor-pointer float-right" onClick={handleCancle}></i>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="imgAbt img-cart">
            <img className='w-100' src={'./images/' + props.product.image}></img>
          </div>
        </div>
        <div className="col-md-9 mt-2">
          <div className="card-body">
            <p className='text-muted'>${price}</p>
            <p>{props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;

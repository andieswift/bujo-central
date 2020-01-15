import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = props.cartItems.map(item => {
    return <CartSummaryItem key={item.productId} product={item} />;
  });
  function handleBackClick() {
    props.setView('catalog', {});
  }
  return (
    <div>
      <p className=" m-1 text-muted cursor-pointer" onClick={handleBackClick}><i className="fas fa-arrow-left"></i> Back to Catalog</p>
      <h1 className= "ml-3"> My Cart </h1>
      {cartItems}
    </div>
  );
}

export default CartSummary;

import React from 'react';

class CartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalClose: false
    };
    this.goShopping = this.goShopping.bind(this);
    this.goToCart = this.goToCart.bind(this);
  }

  goShopping() {
    this.setState({ modalClose: true });
    event.preventDefault();
    setTimeout(
      function () {
        this.props.modalState('catalog');
      }.bind(this)
      ,
      1500
    );
  }

  goToCart() {
    this.setState({ modalClose: true });
    event.preventDefault();
    setTimeout(
      function () {
        this.props.modalState('cart');
      }.bind(this)
      ,
      700
    );

  }

  getModalClass() {
    if (this.state.modalClose) {
      return 'modal-dialog modal-end';
    } else {
      return 'modal-dialog modal-start';
    }
  }

  render() {

    return (
      <div className="modal modal-bg d-flex" tabIndex="-1" role="dialog">
        <div className={this.getModalClass()} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Item added to cart</h5>
            </div>
            <form>
              <div className="modal-body">
                <p>{this.props.itemName} has been added to cart.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.goShopping}> Continue Shopping</button>
                <button type="button" className="btn btn-primary" onClick={this.goToCart}> Go To Cart </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default CartModal;

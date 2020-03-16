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

  closeModal() {
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
      1500
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
            <div className="modal-body">
              <img src={'./images/' + this.props.image}></img>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.closeModal}> Cancel </button>
              <button type="button" className="btn btn-danger" onClick={this.deleteItem}> Delete </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default CartModal;

import React from 'react';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      emptyfields: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  getTotal() {
    const priceArr = this.props.cartItems.map(value => value.price);
    const total = priceArr.reduce((accumulator, currentValue) => accumulator + currentValue);
    return (total / 100).toFixed(2);
  }

  handleBackClick() {
    this.props.setView('catalog', {});
  }

  handleNameChange() {
    this.setState({ name: event.target.value });
  }

  handleCreditCardChange() {
    this.setState({ creditCard: event.target.value });
  }

  handleShippingAddressChange() {
    this.setState({ shippingAddress: event.target.value });
  }

  handleOrder() {
    event.preventDefault();
    if (this.state.name !== '' && this.state.creditCard !== '' && this.state.shippingAddress !== '') {
      this.props.placeOrder({
        name: this.state.name,
        creditCard: this.state.creditCard,
        shippingAddress: this.state.shippingAddress
      });
    } else {
      this.setState({ emptyfields: 'Please fill out all the feilds.' });
    }
  }

  render() {
    return (
      <div>
        <h2>My Cart</h2>
        <p className="text-muted">Order Total: ${this.getTotal()}</p>
        <form onSubmit= {this.handleOrder}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value = {this.state.name} onChange={this.handleNameChange} className="form-control"></input>
          </div>
          <div className="form-group">
            <label>CreditCard</label>
            <input type="text" value={this.state.CreditCard} onChange={this.handleCreditCardChange}className="form-control"></input>
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <textarea value={this.state.shippingAddress} onChange={this.handleShippingAddressChange} className="form-control" rows="5"></textarea>
          </div>
          <p className="text-danger">{this.state.emptyfields}</p>
          <p className=" m-1 text-muted cursor-pointer d-inline" onClick={this.handleBackClick}>
            <i className="fas fa-arrow-left"></i> Continue Shopping</p>
          <button className="btn btn-primary float-right mr-2">Place Order</button>
        </form>
      </div>
    );
  }

}

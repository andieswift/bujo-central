import React from 'react';
import Header from './header';
import ProductList from './productList';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cartItems => {
        this.setState({ cart: cartItems });
      });
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId })
    }).then(cartItems => {
      const cartCopy = [...this.state.cart];
      cartCopy.push(product);
      this.setState({ cart: cartCopy });
    });
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    let view = null;
    if (this.state.view.name === 'details') {
      view = <ProductDetails addToCart = {this.addToCart} setView={this.setView} productId={this.state.view.params.productId}/>;
    } else if (this.state.view.name === 'catalog') {
      view = <ProductList setView={this.setView} />;
    } else {
      view = <CartSummary cartItems = {this.state.cart} setView={this.setView}/>;
    }
    return (
      <>
        <Header setView= {this.setView} cartItemCount = {this.state.cart.length}/>
        <div className="p-5 hgt-100 bg-light">
          {view}
        </div>
      </>);
  }
}

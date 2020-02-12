import React from 'react';
import Header from './header';
import ProductList from './productList';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Footer from './footer';

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
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
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
    }).then(response => response.json())
      .then(cartItems => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(cartItems);
        this.setState({ cart: cartCopy });
      });
  }

  removeFromCart(product) {
    fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItemId: product.cartItemId })
    }).then(response => {
      const cartCopy = [...this.state.cart];
      const index = cartCopy.findIndex(element => element.cartItemId === product.cartItemId);
      cartCopy.splice(index, 1);
      this.setState({ cart: cartCopy });
    });
  }

  placeOrder(orderInfo) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfo)
    }).then(cartItems => {
      this.setView('catalog', {});
      this.setState({ cart: [] });

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
    } else if (this.state.view.name === 'cart') {
      view = <CartSummary deleteItem={this.removeFromCart} cartItems = {this.state.cart} setView={this.setView}/>;
    } else {
      view = <CheckoutForm placeOrder = {this.placeOrder} setView={this.setView} cartItems={this.state.cart} />;
    }
    return (
      <div className="dotted-background">
        <Header setView= {this.setView} cartItemCount = {this.state.cart.length}/>
        <div className="hgt-100">
          {view}
        </div>
        <Footer />
      </div>);
  }
}

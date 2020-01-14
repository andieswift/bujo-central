import React from 'react';
import ProductListItem from './productListItem';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        this.setState({ products: products });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const elements = this.state.products.map(item => <ProductListItem name={item.name}
      image={item.image}
      price={item.price}
      shortDescription={item.shortDescription}
      key={item.productId}/>);
    return (
      <div className="card-container d-flex flex-row flex-wrap justify-content-center pt-5">
        {elements}
      </div>);
  }
}

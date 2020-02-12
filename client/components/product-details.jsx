import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  getProductDetails() {
    fetch(`/api/products/${this.props.productId}`)
      .then(response => response.json())
      .then(product => {
        this.setState({ product: product });
      });
  }

  handleBackClick() {
    this.props.setView('catalog', {});
  }

  handleAddToCart() {
    this.props.addToCart(this.state.product);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  getLongDescription() {
    const longDescript = this.state.product.longDescription.split('\n');
    const displayLongDescript = longDescript.map((value, index) => {
      if (index === 0) {
        return <h5>{value.slice(2)}</h5>;
      } else if (index < longDescript.length - 1) {
        return <li className="m-0" key={index}>{value.slice(2)}</li>;
      }
    });
    return displayLongDescript;
  }

  render() {
    let product = null;

    if (!this.state.product) {
      product = (<div></div>);
    } else {
      const price = (this.state.product.price / 100).toFixed(2);
      product = (
        <div className="pt-5 p-2 mt-md-5">
          <div className="card container">
            <p className=" text-muted cursor-pointer" onClick={this.handleBackClick}><i className="fas fa-arrow-left"></i> Back to Catalog</p>
            <div className="row">
              <div className="col-md-4">
                <div className="imgAbt">
                  <img className=' w-100' src={'./images/' + this.state.product.image}></img>
                </div>
              </div>
              <div className="p-2 col-md-8">
                <h5>{this.state.product.name}</h5>
                <p className='text-muted'>${price}</p>
                <p>{this.state.product.shortDescription}</p>
                <button type="button" className="btn btn-primary" onClick={this.handleAddToCart}>Add to Cart</button>
              </div>
            </div>
            <div>{this.getLongDescription()}</div>
          </div>
        </div>
      );
    }

    return product;
  }
}

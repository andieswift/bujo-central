import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleBackClick = this.handleBackClick.bind(this);
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

  componentDidMount() {
    this.getProductDetails();
  }

  render() {
    let product = null;

    if (!this.state.product) {
      product = (<div></div>);
    } else {
      const price = (this.state.product.price / 100).toFixed(2);
      product = (
        <div className="card">
          <p className=" m-2 text-muted cursor-pointer" onClick={this.handleBackClick}><i className="fas fa-arrow-left"></i> Back to Catalog</p>
          <div className="row">
            <div className="col-md-4">
              <div className="imgAbt">
                <img className=' w-100 m-2' src={this.state.product.image}></img>
              </div>
            </div>
            <div className="p-2 col-md-8">
              <h5>{this.state.product.name}</h5>
              <p className='text-muted'>${price}</p>
              <p>{this.state.product.shortDescription}</p>
            </div>
          </div>
          <p className='m-3'>{this.state.product.longDescription}</p>
        </div>
      );
    }

    return product;
  }
}

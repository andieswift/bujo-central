import React from 'react';
import Header from './header';
import ProductList from './productList';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    let view = null;
    if (this.state.view.name === 'details') {
      view = <ProductDetails setView={this.setView} productId={this.state.view.params.productId}/>;
    } else {
      view = <ProductList setView={this.setView} />;
    }
    return (
      <>
        <Header />
        <div className="p-5 hgt-100 bg-light">
          {view}
        </div>
      </>);
  }
}

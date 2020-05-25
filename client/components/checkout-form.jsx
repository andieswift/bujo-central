import React from 'react';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      emailInvaild: false,
      phone: '',
      phoneInvaild: false,
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      zipInvaild: false,
      name: '',
      cardNumber: '',
      cardInvaild: false,
      expiration: '',
      expirationInvaild: false,
      cvv: ''
    };

    this.handleOrder = this.handleOrder.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddress1Change = this.handleAddress1Change.bind(this);
    this.handleAddress2Change = this.handleAddress2Change.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleExperationChange = this.handleExperationChange.bind(this);
    this.handleCVVChange = this.handleCVVChange.bind(this);
  }

  handleFNameChange() {
    this.setState({ fName: event.target.value });
  }

  handleLNameChange() {
    this.setState({ lName: event.target.value });
  }

  handleEmailChange() {
    this.setState({ email: event.target.value });
  }

  handlePhoneChange() {
    let phoneNumber = event.target.value.replace(/[^\d]/g, '');
    if (phoneNumber.length <= 3) {
      // need this
    } else if (phoneNumber.length <= 6) {
      phoneNumber = `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}`;
    } else if (phoneNumber.length > 6) {
      phoneNumber = `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
    this.setState({ phone: phoneNumber });
  }

  handleAddress1Change() {
    this.setState({ address1: event.target.value });
  }

  handleAddress2Change() {
    this.setState({ address2: event.target.value });
  }

  handleCityChange() {
    this.setState({ city: event.target.value });
  }

  handleStateChange() {
    this.setState({ state: event.target.value });
  }

  handleZipChange() {
    this.setState({ zip: event.target.value.slice(0, 6) });
  }

  handleNameChange() {
    this.setState({ name: event.target.value });
  }

  handleExperationChange() {
    let number = event.target.value.replace(/[^\d]/g, '');
    if (number.length <= 2) {
      number = `${number}`;
    } else {
      number = `${number.slice(0, 2)}/${number.slice(2, 4)}`;
    }
    this.setState({ expiration: number });
  }

  handleCardNumberChange() {
    let number = event.target.value.replace(/[^\d]/g, '');
    if (number.length <= 4) {
      number = `${number}`;
    } else if (number.length <= 8) {
      number = `${number.slice(0, 4)} ${number.slice(4, 8)}`;
    } else if (number.length <= 12) {
      number = `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)}`;
    } else {
      number = `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)} ${number.slice(12, 16)}`;
    }
    this.setState({ cardNumber: number });
  }

  handleCVVChange() {
    this.setState({ cvv: event.target.value });
  }

  getTotal() {
    const priceArr = this.props.cartItems.map(value => value.price);
    const total = priceArr.reduce((accumulator, currentValue) => accumulator + currentValue);
    return (total / 100).toFixed(2);
  }

  handleOrder() {
    event.preventDefault();
    const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const emailInvaild = !EMAIL_RE.test(this.state.email);
    const phoneInvaild = this.state.phone.length < 10;
    const zipInvaild = this.state.zip.length < 5;
    const cardInvaild = this.state.cardNumber.length < 16;
    const expirationInvaild = this.state.expiration.length < 5;
    const shippingAddress = `${this.state.address1} ${this.state.address2} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    if (!emailInvaild && !phoneInvaild && !zipInvaild && !cardInvaild && !expirationInvaild) {
      this.props.placeOrder({
        name: this.state.name,
        creditCard: this.state.cardNumber,
        shippingAddress: shippingAddress
      });
    } else {
      this.setState({ emailInvaild: emailInvaild, phoneInvaild: phoneInvaild, zipInvaild: zipInvaild, cardInvaild: cardInvaild, expirationInvaild: expirationInvaild });
    }
  }

  handleBackClick() {
    this.props.setView('catalog', {});
  }

  render() {
    const states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS',
      'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
      'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
    return (
      <div className="pt-5 p-5 mt-md-5 container col-md-8 ">
        <h3 className="text-muted">Order Total: ${this.getTotal()}</h3>
        <form onSubmit= {this.handleOrder}>
          <h3>Billing/Shipping</h3>
          <div className="form-row">
            <div className="form-group col-md-6 col-sm-12">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="John" onChange={this.handleFNameChange} value={this.state.fName} required/>
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Doe" onChange={this.handleLNameChange} value={this.state.lName} required/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 col-sm-12">
              <label>Email</label>
              <input type="text" className={this.state.emailInvaild ? 'is-invalid form-control' : 'form-control'} placeholder="john_doe@gmail.com" onChange={this.handleEmailChange} value={this.state.email} required />
              {this.state.emailInvaild ? <p className="text-danger"> Please provide a valid email. </p> : null}
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <label>Phone Number</label>
              <input type="text" className={this.state.phoneInvaild ? 'is-invalid form-control' : 'form-control'} placeholder="(555)555-5555" onChange={this.handlePhoneChange} value={this.state.phone} required/>
              {this.state.phoneInvaild ? <p className="text-danger"> Please provide a valid phone number. </p> : null}
            </div>
          </div>
          <div className="form-group">
            <label>Street Address 1 </label>
            <input type="text" className="form-control" placeholder="123 Main St." onChange={this.handleAddress1Change} value={this.state.address1} required></input>
          </div>
          <div className="form-group">
            <label> Address 2 </label>
            <input type="text" className="form-control" placeholder="Apt. 1" onChange={this.handleAddress2Change} value={this.state.address2}></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 col-sm-12">
              <label>City</label>
              <input type="text" className="form-control" placeholder="New York" onChange={this.handleCityChange} value={this.state.city} required/>
            </div>
            <div className="form-group d-flex flex-column col-md-2 col-sm-12">
              <label>State</label>
              <select className="form-control" value={this.state.state} onChange={this.handleStateChange} required>
                {states.map(value => <option value={value} key={value} >{value}</option>)}
              </select>
            </div>
            <div className="form-group col-md-4 col-sm-12">
              <label>Zipcode</label>
              <input type="number" className={this.state.zipInvaild ? 'is-invalid form-control' : 'form-control'} placeholder="55555" onChange={this.handleZipChange} value={this.state.zip} required/>
              {this.state.zipInvaild ? <p className="text-danger"> Please provide a valid zipcode. </p> : null}
            </div>
          </div>
          <h3>Payment</h3>
          <div className="form-row">
            <div className="form-group col-md-6 col-sm-12">
              <label>Name on Card</label>
              <input type="text" className="form-control" placeholder="John K. Doe" onChange={this.handleNameChange} value={this.state.name} required />
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <label>Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" className={this.state.cardInvaild ? 'form-control is-invalid' : 'form-control'} onChange={this.handleCardNumberChange} value={this.state.cardNumber} required/>
              {this.state.cardInvaild ? <p className="text-danger"> Please provide a valid card number. </p> : null}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 col-sm-12">
              <label>Expiration date</label>
              <input type="text" placeholder="MM/YY" className={this.state.expirationInvaild ? 'form-control is-invalid' : 'form-control'} onChange={this.handleExperationChange} value={this.state.expiration} required/>
              {this.state.expirationInvaild ? <p className="text-danger"> Please provide a valid date. </p> : null}
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <label>CVV</label>
              <input type="number" placeholder="XXX" className="form-control" onChange={this.handleCVVChange} value={this.state.cvv} required/>
            </div>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required/>
            <label className="form-check-label mb-5" htmlFor="defaultCheck1">
              I acknowledge that this is a demo application, and the information above is not my genuine financial or personal information.
            </label>
          </div>
          <p className=" m-1 text-muted cursor-pointer d-inline" onClick={this.handleBackClick}>
            <i className="fas fa-arrow-left"></i> Continue Shopping</p>
          <button className="btn btn-primary float-right mr-2">Place Order</button>
        </form>
      </div>
    );
  }

}

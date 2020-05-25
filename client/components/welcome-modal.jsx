import React from 'react';

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkbox: false,
      modalClose: false
    };

    this.checkboxChange = this.checkboxChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  checkboxChange() {
    this.setState({ checkbox: !this.state.checkbox });
  }

  closeModal() {
    if (this.state.checkbox) {
      this.setState({ modalClose: true });
      event.preventDefault();
      setTimeout(
        function () {
          this.props.modalState('accepted');
        }.bind(this)
        ,
        1500
      );
    }
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
              <h5 className="modal-title">Welcome to Bujo Central</h5>
            </div>
            <form>
              <div className="modal-body">
                <p>Please note that this website is a content mangagement application created for the purpose of demostration. Check the box below to acknowledge that the merchandise shown here
              is not available for purchase, that you will not provide genuine financial or personal information, and that you are aware no purchase will truly be processed.
                </p>
                <input className="d-inline is-valid" type="checkbox" aria-label="Checkbox for following text input" value={this.state.checkbox} onChange={this.checkboxChange} required/>
                <p className='d-inline'>I acknowledge that this is strictly a demo application</p>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default WelcomeModal;

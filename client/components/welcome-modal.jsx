import React from 'react';

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkbox: false,
      buttonClick: false
    };

    this.checkboxChange = this.checkboxChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  checkboxChange() {
    this.setState({ checkbox: !this.state.checkbox });
  }

  closeModal() {
    if (this.state.checkbox) {
      this.props.modalState('accepted');
    } else {
      this.setState({ buttonClick: true });
    }
  }

  render() {
    return (
      <div className="modal d-flex" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Welcome to Bujo Central</h5>
              <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Please note that this website is a content mangagement application created for the purpose of demostration. Check the box below to acknowledge that the merchandise shown here
              is not available for purchase, that you will ot provide genuine financial or personal information, and that you are aware no purchase will truly be processed.
              </p>
              <input className="d-inline is-valid" type="checkbox" aria-label="Checkbox for following text input" value={this.state.checkbox} onChange={this.checkboxChange} required/>
              <p className="d-inline">I acknowledge that this is strictly a demo application</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeModal;

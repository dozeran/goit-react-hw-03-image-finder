import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleEscapeDown = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  closeModal = () => {
    this.props.onCloseModal();
  };

  render() {
    const { isModal, src } = this.props;
    return (
      <>
        {isModal ? (
          <div className={css.overlay} onClick={this.closeModal}>
            <div className={css.modal}>
              <img src={src} alt="" />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Modal;

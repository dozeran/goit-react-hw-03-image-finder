import { Component } from 'react';
import css from './Button.module.css';

class Button extends Component {
  render() {
    const { isButton, loadMore } = this.props;
    return (
      <>
        {isButton ? (
          <button className={css.button} onClick={loadMore}>
            Load more
          </button>
        ) : null}
      </>
    );
  }
}

export default Button;

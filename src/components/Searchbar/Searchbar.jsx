import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    request: '',
  };

  handleInputChange = e => {
    this.setState({
      request: e.target.value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onQueryChange(this.state.request);
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleFormSubmit}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputChange}
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;

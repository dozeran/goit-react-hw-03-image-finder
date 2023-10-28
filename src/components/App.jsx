import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39382109-d071ce59cf94359f9a44c3b97';

class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isLoading: false,
    isButton: false,
  };

  fetchPhotos = async (newQuery, currentPage) => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: newQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: currentPage,
          per_page: 12,
        },
      });
      if (response.data.total === 0) {
        this.setState({
          photos: [],
          isButton: false,
        });
        return;
      }

      this.setState(prevState => ({
        photos: [...prevState.photos, ...response.data.hits],
        query: newQuery,
        page: currentPage + 1,
        isButton: true,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateQuery = query => {
    this.setState({ isLoading: true });
    this.fetchPhotos(query, 1);
  };

  loadMore = () => {
    this.setState({ isLoading: true });
    this.fetchPhotos(this.state.query, this.state.page);
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ page: 1, photos: [] });
      this.fetchPhotos(this.state.query, 1);
    }
  }

  render() {
    return (
      <>
        <Searchbar onQueryChange={this.updateQuery} />
        <ImageGallery photos={this.state.photos} />
        <Loader isLoading={this.state.isLoading} />
        <Button isButton={this.state.isButton} loadMore={this.loadMore} />
      </>
    );
  }
}

export default App;

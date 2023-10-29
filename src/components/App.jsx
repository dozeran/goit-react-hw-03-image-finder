import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchPhotos } from 'service/search-api';

class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isLoading: false,
    isButton: false,
  };

  fetchPhotosFromApi = async (newQuery, currentPage) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetchPhotos(newQuery, currentPage);
      if (response.total === 0) {
        this.setState({
          photos: [],
          isButton: false,
        });
        return;
      }

      this.setState(prevState => ({
        photos: [...prevState.photos, ...response.hits],
        query: newQuery,
        isButton: true,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateQuery = query => {
    this.setState({ page: 1, photos: [], query });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      (this.state.query !== prevState.query || this.state.page) !==
      prevState.page
    ) {
      this.fetchPhotosFromApi(this.state.query, this.state.page);
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

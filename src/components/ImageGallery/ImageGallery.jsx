import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    isModal: false,
    fullImage: '',
  };

  onClickImage = fullImage => {
    this.setState({
      fullImage,
      isModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({ isModal: false });
  };

  render() {
    const { photos } = this.props;

    return (
      <>
        <ul className={css.imageGallery}>
          {photos.map(photo => (
            <ImageGalleryItem
              key={photo.id}
              photo={photo}
              onClickImage={this.onClickImage}
            />
          ))}
        </ul>
        <Modal
          isModal={this.state.isModal}
          src={this.state.fullImage}
          onCloseModal={this.onCloseModal}
        />
      </>
    );
  }
}

export default ImageGallery;

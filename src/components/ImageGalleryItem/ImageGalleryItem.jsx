import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  onClickImage = () => {
    const { onClickImage, photo } = this.props;
    onClickImage(photo.largeImageURL);
  };

  render() {
    const { photo } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            src={photo.webformatURL}
            alt={photo.tags}
            className={css.imageGalleryItemImage}
            onClick={this.onClickImage}
          />
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;

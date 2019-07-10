import React from 'react';

import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = ({images, match}) => {
  console.log(match);
  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {images.map(image => {
          return(
            <GalleryItem
              img={image.img}
              key={image.id}
            />
          )
        }


        )}
      </ul>
    </div>
  )
}

export default Gallery;

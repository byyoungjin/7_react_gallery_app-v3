import React from 'react';
import {Consumer} from './Context';

import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = ({match}) => {
  return (
    <Consumer>
      {context => {
        // need to make conditionals lookig match.path => choosing images
        let displayImages=[];
        switch(match.path){
          case "/cats":
            displayImages=context.catImages;
          break;
          case "/dogs":
            displayImages=context.dogImages;
          break;
          case "/computers":
            displayImages=context.computerImages;
          break;
          default:
            displayImages=context.images;
        }
        return (
          <div className="photo-container">
            <h2>Results</h2>
            <ul>
              {displayImages.map(image => {
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
      }}
    </Consumer>

  )
}

export default Gallery;

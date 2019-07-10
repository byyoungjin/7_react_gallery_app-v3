import React from 'react';
import {Consumer} from './Context';

import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = ({match}) => {
  const searchTerm =match.params.search;
  return (
    <Consumer>
      {context => {
        // need to make conditionals lookig match.path => choosing images
        let displayImages=[];
        switch(match.params.search){
          case "cats":
            displayImages=context.catImages;
          break;
          case "dogs":
            displayImages=context.dogImages;
          break;
          case "computers":
            displayImages=context.computerImages;
          break;
          default:
            displayImages=context.images;
        }
        return (
          (displayImages.length>0)
          ?
          <div className="photo-container">
            <h2>{searchTerm ?`${searchTerm} GIFs` : `Welcome to GIFs`}</h2>
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
          : <NotFound />

        )
      }}
    </Consumer>

  )
}

export default Gallery;

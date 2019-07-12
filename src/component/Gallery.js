import React from 'react';
import {Consumer} from './Context';

import GalleryItem from './GalleryItem';
import NoResult from './NoResult';

const Gallery = ({match}) => {
  const searchTerm =match.params.search;
  return (
    <Consumer>
      {context => {
        // Conditionals lookig match.path => choosing images
        let displayImages=[];
        switch(match.url){
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
        console.log(displayImages.length);
        return (
          //Check if there are images to render. If not, render <NoResult />
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
          : <NoResult />

        )
      }}
    </Consumer>

  )
}

export default Gallery;

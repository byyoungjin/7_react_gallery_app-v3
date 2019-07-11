import React from 'react';


const GalleryItem = ({img}) => {
 return(
   <li className="gallery-item">
     <img src={img} alt='img' />
   </li>
 )
}

export default GalleryItem;

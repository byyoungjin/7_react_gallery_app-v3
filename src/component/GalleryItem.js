import React from 'react';


const GalleryItem = ({img}) => {
 return(
   <li>
     <img src={img} alt='img' />
   </li>
 )
}

export default GalleryItem;

import React from 'react'

import styles from './image.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faImages } from '@fortawesome/free-solid-svg-icons';

function ImageItem({key, images = [], ...props}) {
  return (
    <div key = {key} className = {styles.image_item}>
        <div className = {styles.image_status}>
            {
                images.length > 1 ? <FontAwesomeIcon icon = {faImages}/> : <FontAwesomeIcon icon = {faImage}/>
            }
        </div>
        <img src={images[0]} alt="random" />
    </div>
  )
}

export default ImageItem
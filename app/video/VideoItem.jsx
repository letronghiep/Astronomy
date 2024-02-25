import React from 'react'

import styles from './video.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function VideoItem({value, onClick}) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <div className = {styles.video_item} onClick = {handleClick}>
        <div className = {styles.video_item__thumbnail}>
            <div className = {styles.play_video}>
                <FontAwesomeIcon icon = {faPlay}/>
            </div>
            <img src="https://baothainguyen.vn/file//oldimage/baothainguyen/UserFiles/image/d2(23).jpg" alt="" />
        </div>
    </div>
  )
}

export default VideoItem
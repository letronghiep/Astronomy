import React from 'react';
import styles from './video.module.css';
import VideoItem from './VideoItem';

function VideoList({props = [], onClick = () => {}}) {
  console.log(props);

  return (
    <div className={styles.video_wait}>
      {props.map((video, index) => (
        <VideoItem key={index} value={video} onClick = {onClick}/>
      ))}
    </div>
  );
}

export default VideoList;

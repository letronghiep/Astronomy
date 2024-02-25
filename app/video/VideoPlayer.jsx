import React, { useEffect, useRef, useState } from 'react';
import styles from './video.module.css';

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAndPlayVideo = async () => {
      
      if (videoRef.current) {
        videoRef.current.src = src;
        setLoading(true);
        await videoRef.current.load();
        setLoading(false);
        videoRef.current.play();
      }
    };

    loadAndPlayVideo();
  }, [src]);

  return (
    <div className={styles.video_player}>
      <video controls ref={videoRef} id="video">
        <source src={src}  type="video/mp4" />
      </video>
      {loading && <div className = {styles.video_loading}></div>}
    </div>
  );
}

export default VideoPlayer;
